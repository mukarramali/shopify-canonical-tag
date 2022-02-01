import { Card, ResourceList, Stack, TextStyle } from "@shopify/polaris";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_PRODUCT_META_FIELDS = gql`
  query product($id: ID!) {
    product(id: $id) {
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

function MetaFields({ productId }) {
  return (
    <Query query={GET_PRODUCT_META_FIELDS} variables={{ id: productId }}>
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
              items={data.product.metafields.edges}
              renderItem={({ node: { id, key, namespace, value } }) => {
                return (
                  <ResourceList.Item id={id} verticalAlignment="center">
                    <Stack alignment="center">
                      <Stack.Item>
                        <TextStyle>{key}</TextStyle>
                      </Stack.Item>
                      <Stack.Item>
                        <TextStyle>{namespace}</TextStyle>
                      </Stack.Item>
                      <Stack.Item fill>
                        <TextStyle>{value}</TextStyle>
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
  return (
    <>
      <MetaFields productId={product.id} />
    </>
  );
}
