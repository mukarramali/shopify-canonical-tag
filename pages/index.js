import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Layout, Page } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { EmptyProduct } from "../components/EmptyProduct";
import { InstallationStep } from "../components/InstallationStep";
import { ProductForm } from "../components/ProductForm";

const Index = () => {
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const handleSelection = useCallback(
    (resources) => {
      setOpen(false);
      setProduct(resources.selection[0]);
    },
    [setProduct]
  );

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Button primary={true} onClick={() => setOpen(true)}>
            Choose Product
          </Button>
        </Layout.Section>
        {product ? (
          <ProductForm product={product} />
        ) : (
          <EmptyProduct setOpen={setOpen} />
        )}
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setOpen(false)}
          allowMultiple={false}
        />
        <InstallationStep />
      </Layout>
    </Page>
  );
};

export default Index;
