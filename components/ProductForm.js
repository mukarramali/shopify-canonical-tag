import { Card, Layout, TextField } from "@shopify/polaris";
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
        const canonicalTagMetaField = data.product.metafields.edges.filter(
          ({ node: { key, namespace } }) =>
            key === "canonical_tag" && namespace === "custom"
        )?.[0]?.node;
        return (
          <Card
            title="Canonical Tag"
            sectioned
            footerActionAlignment="right"
            primaryFooterAction={{
              disabled: false,
              content: "Update",
            }}
          >
            <TextField value={canonicalTagMetaField.value} />
          </Card>
        );
      }}
    </Query>
  );
}

export function ProductForm({ product }) {
  return (
    <Layout.Section>
      <MetaFields productId={product.id} />
    </Layout.Section>
  );
}
