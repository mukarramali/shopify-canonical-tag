import { Card, Layout, TextField } from "@shopify/polaris";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";

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
  const { data } = useQuery(GET_PRODUCT_META_FIELDS, {
    variables: {
      id: productId,
    },
  });
  const [value, setValue] = useState();
  useEffect(() => {
    if (data) {
      const canonicalTagMetaField = data.product.metafields.edges.filter(
        ({ node: { key, namespace } }) =>
          key === "canonical_tag" && namespace === "custom"
      )?.[0]?.node;
      if (canonicalTagMetaField) {
        setValue(canonicalTagMetaField.value);
      }
    }
  }, [data]);

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
      <TextField value={value} onChange={(newValue) => setValue(newValue)} />
    </Card>
  );
}

export function ProductForm({ product }) {
  return (
    <Layout.Section>
      <MetaFields productId={product.id} />
    </Layout.Section>
  );
}
