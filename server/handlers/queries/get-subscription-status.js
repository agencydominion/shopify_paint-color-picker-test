import "isomorphic-fetch";
import { gql } from "apollo-boost";

const GET_SUBSCRIPTION_STATUS = gql`
  {
    currentAppInstallation {
      activeSubscriptions {
        status
      }
    }
  }
`;

export const getSubscriptionStatus = async (client) => {
  return client
    .query({
      query: GET_SUBSCRIPTION_STATUS,
    })
    .then((response) => {
      if (
        response.data.currentAppInstallation.activeSubscriptions.length &&
        response.data.currentAppInstallation.activeSubscriptions[0].status ===
          "ACTIVE"
      ) {
        return "ACTIVE";
      } else {
        return "INACTIVE";
      }
    });
};
