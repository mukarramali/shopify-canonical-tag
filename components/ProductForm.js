import { Banner, Card, Layout, TextField } from "@shopify/polaris";
import gql from "graphql-tag";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import usePrevProps from "./hooks";

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

const UPDATE_PRODUCT_META_FIELD = gql`
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function MetaFields({ productId }) {
  const [value, setValue] = useState();
  const [initialValue, setInitialValue] = useState();
  const [changed, setChanged] = useState(false);
  const [status, setStatus] = useState();
  const prevProductId = usePrevProps(productId);

  useEffect(() => {
    if (prevProductId && prevProductId !== productId) {
      setValue("");
    }
  }, [productId, prevProductId]);

  const { data } = useQuery(GET_PRODUCT_META_FIELDS, {
    variables: {
      id: productId,
    },
  });
  const [update, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_PRODUCT_META_FIELD,
    {
      variables: {
        metafields: {
          key: "canonical_tag",
          namespace: "custom",
          ownerId: productId,
          type: "url",
          value,
        },
      },
    }
  );

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

  const onSuccess = useCallback(() => {
    setInitialValue(value);
    setStatus("success");
  }, [setStatus, setInitialValue]);

  const onSubmit = useCallback(async () => {
    setChanged(false);
    // Replace with update query
    await update();
    setStatus("success");
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
      {status && (
        <Banner
          title="Updated!"
          status={status}
          onDismiss={() => setStatus(null)}
        />
      )}
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
