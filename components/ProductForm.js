import { Card, ResourceList, Stack, TextStyle } from "@shopify/polaris";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_PRODUCT_META_FIELDS = gql`
  query productVariant($id: ID!) {
    productVariant(id: $id) {
      title
      metafields(first: 1) {
        edges {
          node {
            id
            key
            namespace
            value
            description
          }
        }
      }
    }
  }
`;

function MetaFields({ variantId }) {
  return (
    <Query query={GET_PRODUCT_META_FIELDS} variables={{ id: variantId }}>
      {({ data, loading, error, refetch }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{JSON.stringify(error)}</div>;
        if (!data) return <div>Nothing!</div>;
        console.log({ data });
        return (
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Metafield", plural: "Metafields" }}
              items={data.productVariant.metafields.edges}
              renderItem={({ node }) => {
                return (
                  <ResourceList.Item id={node.id} verticalAlignment="center">
                    <Stack alignment="center">
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">
                            key:{node.key}, namespace: {node.namespace}
                          </TextStyle>
                        </h3>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        );
      }}
    </Query>
  );
}

export function ProductForm({ product }) {
  console.log("ProductForm", { product });
  const variantId = product?.variants?.[0]?.id;

  return (
    <>
      <MetaFields variantId="gid://shopify/ProductVariant/39566498922519" />
    </>
  );
}
