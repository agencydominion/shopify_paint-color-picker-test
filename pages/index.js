import { useEffect } from "react";
import { useRouter } from "next/router";
import createPersistedState from "use-persisted-state";
import { useOnValueChange } from "@shopify/react-hooks";

import { ROUTES } from "../constants";

const useAppSubscriptionStatusState = createPersistedState(
  "prapp.appSubscriptionStatus"
);

const Index = () => {
  const router = useRouter();
  const [
    appSubscriptionStatus,
    setAppSubscriptionStatus,
  ] = useAppSubscriptionStatusState(0);

  useOnValueChange(appSubscriptionStatus, (_, oldAppSubscriptionStatus) => {
    const url = ROUTES.setupInstructions;
    router.replace(url);
  });

  useEffect(() => {
    setAppSubscriptionStatus(
      (currentAppSubscriptionStatus) => currentAppSubscriptionStatus + 1
    );
  }, []);

  return null;
};

export default Index;
