import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  TextField,
} from "@shopify/polaris";
import gql from "graphql-tag";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import usePrevProps from "../hooks";
import { useTranslations } from "../i18n";

const GET_PRODUCT_META_FIELDS = gql`
  query product($id: ID!) {
    product(id: $id) {
      metafields(first: 100) {
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

function MetaFields({ productId, productTitle }) {
  const [value, setValue] = useState();
  const [initialValue, setInitialValue] = useState();
  const [changed, setChanged] = useState(false);
  const [status, setStatus] = useState();
  const prevProductId = usePrevProps(productId);
  const t = useTranslations();

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
          key: "canonical_url",
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
          key === "canonical_url" && namespace === "custom"
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
    await update();
    setStatus("success");
  }, [onSuccess]);

  return (
    <>
      <Card sectioned title={productTitle}>
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <TextField
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setChanged(newValue !== initialValue);
              }}
              label="Meta Tag"
              type="url"
              helpText={<span>{t("restore_assurance")}</span>}
            />
            <Button submit primary disabled={!changed}>
              {t("update")}
            </Button>
          </FormLayout>
        </Form>
      </Card>
      {status && (
        <Banner
          title={t("success_msg")}
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
      <MetaFields productId={product.id} productTitle={product.title} />
    </Layout.Section>
  );
}
