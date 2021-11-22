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

const SetupInstructions = () => {
  const app = useAppBridge();

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <TextContainer>
                  <Heading>Setup instructions</Heading>
                  <p>
                    The Paint Color Picker is now added to your online store.
                    Make it your own by adding it to product pages as a block or
                    section. It includes functionality to disable the Custom
                    Color input.
                  </p>
                </TextContainer>
              </Card.Section>
              <Card.Section>
                <TextContainer>
                  <Heading element="h3">
                    Add and customize the Paint Color Picker
                  </Heading>
                  <List type="number">
                    <List.Item>
                      From your Shopify admin, go to{" "}
                      <strong>Online Store &gt; Themes</strong>.
                    </List.Item>
                    <List.Item>
                      Find the theme that you want to edit, and then click{" "}
                      <strong>Customize</strong>.
                    </List.Item>
                    <List.Item>
                      From the dropdown menu, select{" "}
                      <strong>Products &gt; Default product</strong>.
                    </List.Item>
                    <List.Item>
                      Click <strong>+ Add block</strong> or{" "}
                      <strong>+ Add section</strong>.
                    </List.Item>
                    <List.Item>
                      Under <strong>Apps</strong>, select Paint Color Picker.
                    </List.Item>
                    <List.Item>
                      Optional: Change the position of the Paint Color Picker.
                      <List type="bullet">
                        <List.Item>
                          On the section or block that you want to move, click{" "}
                          <TextStyle variation="code">⋮⋮</TextStyle> and drag
                          the section or block to a different place.
                        </List.Item>
                      </List>
                    </List.Item>
                    <List.Item>
                      Optional: Click the Paint Color Picker to load the content
                      into the preview window and access the options available
                      to you.
                      <List type="bullet">
                        <List.Item>
                          Click the <strong>Disable Custom Color input</strong>{" "}
                          checkbox if you want to remove the Custom Color input.
                        </List.Item>
                      </List>
                    </List.Item>
                    <List.Item>
                      Click <strong>Save</strong>.
                    </List.Item>
                  </List>
                </TextContainer>
              </Card.Section>
              <Card.Section>
                <TextContainer>
                  <Heading element="h3">Remove the Paint Color Picker</Heading>
                  <List type="number">
                    <List.Item>
                      From your Shopify admin, go to Online{" "}
                      <strong>Store &gt; Themes</strong>.
                    </List.Item>
                    <List.Item>
                      Find the theme that you want to edit, and then click{" "}
                      <strong>Customize</strong>.
                    </List.Item>
                    <List.Item>
                      From the dropdown menu, select{" "}
                      <strong>Products &gt; Default product</strong>.
                    </List.Item>
                    <List.Item>Click the Paint Color Picker.</List.Item>
                    <List.Item>
                      At the bottom of the Paint Color Picker settings, click{" "}
                      <strong>Remove block</strong> or{" "}
                      <strong>Remove section</strong>.
                    </List.Item>
                    <List.Item>
                      Click <strong>Save</strong>.
                    </List.Item>
                  </List>
                </TextContainer>
              </Card.Section>
              <Card.Section>
                <TextContainer>
                  <Heading element="h3">
                    Add the Paint Color Picker to a specific product
                  </Heading>
                  <p>
                    In some cases you may want to add the Paint Color Picker to
                    a product that currently does not have it enabled. The Paint
                    Color Picker is enabled on a product by using tags to
                    indicate if it is tintable. Below are the instructions to
                    add the tags.
                  </p>
                  <List type="number">
                    <List.Item>
                      From your Shopify admin, go to{" "}
                      <strong>Products &gt; All products.</strong>
                    </List.Item>
                    <List.Item>
                      Search for the specific product you would like to add the
                      Paint Color Picker to.
                    </List.Item>
                    <List.Item>
                      Click on the product name to open the specific product
                      details page.
                    </List.Item>
                    <List.Item>
                      In the <strong>Tags</strong> section, enter the name of a
                      tag you want to add, or select it from the list of
                      existing tags.
                      <DescriptionList
                        items={[
                          {
                            term: "Tintable",
                            description:
                              "This tag is used to add the primary color collections.",
                          },
                          {
                            term: "Tintable Aura",
                            description:
                              "This tag is used to add the Aura Color Stories color collection.",
                          },
                          {
                            term: "Tintable Arborcoat",
                            description:
                              "This tag is used to add the Arborcoat color collection.",
                          },
                        ]}
                      />
                    </List.Item>
                    <List.Item>
                      Click <strong>Save</strong>.
                    </List.Item>
                  </List>
                </TextContainer>
              </Card.Section>
              <Card.Section>
                <TextContainer>
                  <Heading element="h3">
                    Remove the Paint Color Picker from a specific product
                  </Heading>
                  <p>
                    In some cases you may want to remove the Paint Color Picker
                    from a product that currently has it enabled. The Paint
                    Color Picker is enabled on a product by using tags to
                    indicate if it is tintable. Below are the instructions to
                    remove the tags.
                  </p>
                  <List type="number">
                    <List.Item>
                      From your Shopify admin, go to{" "}
                      <strong>Products &gt; All products.</strong>
                    </List.Item>
                    <List.Item>
                      Search for the specific product you would like to remove
                      the Paint Color Picker from.
                    </List.Item>
                    <List.Item>
                      Click on the product name to open the specific product
                      details page.
                    </List.Item>
                    <List.Item>
                      Click the <TextStyle variation="code">&times;</TextStyle>{" "}
                      next to the tag that you want to remove. The tag is
                      removed only from that specific product.
                    </List.Item>
                    <List.Item>
                      Click <strong>Save</strong>.
                    </List.Item>
                  </List>
                </TextContainer>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default SetupInstructions;
