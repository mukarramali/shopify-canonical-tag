import { Banner, Card, Layout, TextField } from "@shopify/polaris";
import gql from "graphql-tag";
import { useCallback, useEffect, useState } from "react";
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
  const [initialValue, setInitialValue] = useState();
  const [changed, setChanged] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (data) {
      const canonicalTagMetaField = data.product.metafields.edges.filter(
        ({ node: { key, namespace } }) =>
          key === "canonical_tag" && namespace === "custom"
      )?.[0]?.node;
      if (canonicalTagMetaField) {
        setValue(canonicalTagMetaField.value);
        setInitialValue(canonicalTagMetaField.value);
      }
    }
  }, [data]);

  const onSuccess = () => {
    console.log({ initialValue: value });
    setInitialValue(value);
    setStatus("success");
    setTimeout(() => {
      setStatus("");
    }, 2000);
  };

  const onSubmit = useCallback(() => {
    setChanged(false);
    // Replace with actual query
    setTimeout(() => {
      onSuccess();
    }, 3000);
  }, [onSuccess]);

  return (
    <>
      <Card
        title="Canonical Tag"
        sectioned
        footerActionAlignment="right"
        primaryFooterAction={{
          disabled: !changed,
          content: "Update",
          onAction: onSubmit,
        }}
      >
        <TextField
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setChanged(newValue !== initialValue);
          }}
        />
      </Card>
      {status && <Banner title="Updated!" status={status} />}
    </>
  );
}

export function ProductForm({ product }) {
  return (
    <Layout.Section>
      <MetaFields productId={product.id} />
    </Layout.Section>
  );
}
