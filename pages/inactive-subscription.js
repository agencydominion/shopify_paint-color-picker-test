import { useRouter } from "next/router";
import { Page, Layout, Card, Heading, TextContainer } from "@shopify/polaris";

const InactiveSubscription = () => {
  const router = useRouter();

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <Card
              primaryFooterAction={{
                content: "Update Subscription",
                onAction: () => {
                  const url = "/offline/auth?shop=" + router.query.shop;
                  router.replace(url);
                },
              }}
            >
              <Card.Section>
                <TextContainer>
                  <Heading>Inactive Subscription</Heading>
                  <p>
                    Your subscription is currently inactive, please subscribe to
                    use the app. You can do this by deleting the app and
                    reinstalling. Once the app is reinstalled please approve the
                    app charge.
                  </p>
                </TextContainer>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default InactiveSubscription;
