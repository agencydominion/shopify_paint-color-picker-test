import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import {
  createClient,
  getSubscriptionStatus,
  getSubscriptionUrl,
} from "./handlers";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES ? process.env.SCOPES.split(",") : "read_products",
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: "2021-10",
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  ACTIVE_SUBSCRIPTION: "ACTIVE",
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  // This sample App leverages both "online" and "offline" Shopify API access modes
  // as an example of how to have them configured.

  // Read more about Shopify API access modes in
  // https://shopify.dev/concepts/about-apis/authentication#api-access-modes
  server.use(
    createShopifyAuth({
      accessMode: "online",
      prefix: "/online",
      async afterAuth(ctx) {
        // Online access mode access token and shop available in ctx.state.shopify
        const { shop } = ctx.state.shopify;

        // Redirect to app with shop parameter upon auth
        const session = await Shopify.Utils.loadCurrentSession(
          ctx.req,
          ctx.res
        );
        const client = createClient(session.shop, session.accessToken);
        const subscriptionURL = await getSubscriptionUrl(ctx, client);
        ctx.redirect(`${subscriptionURL}`);
      },
    })
  );

  // Shopify API "offline" access mode tokens are meant for long term access to a store,
  // where no user interaction is involved is ideal for background work in response to webhooks,
  // or for maintenance work in backgrounded jobs.
  server.use(
    createShopifyAuth({
      accessMode: "offline",
      prefix: "/offline",
      async afterAuth(ctx) {
        // Offline access mode access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;

        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        let response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to online auth entry point to create
        // an online access mode token that will be used by the embedded app
        ctx.redirect(`/online/auth/?shop=${shop}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  const verifySubscription = async (ctx, next) => {
    if (Shopify.Context.ACTIVE_SUBSCRIPTION !== "INACTIVE") {
      const { shop } = ctx.query;
      if (shop !== undefined) {
        const session = await Shopify.Utils.loadOfflineSession(shop);
        if (session !== undefined) {
          const client = createClient(shop, session.accessToken);
          const subscriptionStatus = await getSubscriptionStatus(client);
          Shopify.Context.ACTIVE_SUBSCRIPTION = subscriptionStatus;
        }
      }
    }
    return next();
  };

  const verifyIfActiveShopifyShop = (ctx, next) => {
    const { shop, host } = ctx.query;

    // This shop doesn't have an active subscription yet, redriect to OAuth to trigger the billing
    if (
      Shopify.Context.ACTIVE_SUBSCRIPTION === "INACTIVE" &&
      host !== undefined
    ) {
      ctx.redirect(
        `${process.env.HOST}/inactive-subscription?shop=${shop}&host=${host}`
      );
      return;
    }

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/offline/auth?shop=${shop}`);
      return;
    }

    return next();
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    // Requests to `/graphql` must have an online session
    // Shopify.Utils.graphqlProxy only works for accessMode: "online" sessions
    verifyRequest({ returnHeader: true, authRoute: "/online/auth" }),
    async (ctx) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("/inactive-subscription", async (ctx) => {
    await handleRequest(ctx);
  });

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear

  // Embedded app Next.js entry point
  router.get(
    "(.*)",
    verifySubscription,
    verifyIfActiveShopifyShop,
    handleRequest
  );

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
