import { Card, ResourceList, Stack, TextStyle } from "@shopify/polaris";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_PRODUCT_META_FIELDS = gql`
  query productVariant($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
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
  }
`;

function MetaFields({ productId }) {
  return (
    <Query query={GET_PRODUCT_META_FIELDS} variables={{ id: productId }}>
      {({ data, loading, error, refetch }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{JSON.stringify(error)}</div>;
        if (!data) return <div>Nothing!</div>;
        return (
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Metafield", plural: "Metafields" }}
              items={data.nodes.metafields}
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
                      <Stack.Item>
                        <p>${price}</p>
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
      {/* <strong>{JSON.stringify(product)}</strong> */}
      <MetaFields productId={variantId} />
    </>
  );
}
