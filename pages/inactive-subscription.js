import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Page,
  List,
  Layout,
  Card,
  DescriptionList,
  TextStyle,
  Heading,
  TextContainer,
} from "@shopify/polaris";

const InactiveSubscription = () => {
  const app = useAppBridge();

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <TextContainer>
                  <Heading>Inactive Subscription</Heading>
                  <p>
                    Your subscription is currently inactive, please subscribe to
                    use the app.
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
