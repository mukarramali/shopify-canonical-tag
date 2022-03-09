import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Layout, Page, Stack } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { EmptyProduct } from "../components/EmptyProduct";
import { useLocale } from "../components/hooks";
import { InstallationStep } from "../components/InstallationStep";
import { Instructions } from "../components/Instructions";
import { ProductForm } from "../components/ProductForm";

const Index = () => {
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const locale = useLocale();

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
          <Stack>
            <Stack.Item fill>
              <Button primary={true} onClick={() => setOpen(true)}>
                Choose Product
              </Button>
            </Stack.Item>
            <Stack.Item>
              <Button onClick={() => setShowInstructions(true)}>
                Instructions
              </Button>
            </Stack.Item>
          </Stack>
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
        <Instructions
          showInstructions={showInstructions}
          setShowInstructions={setShowInstructions}
        />
      </Layout>
    </Page>
  );
};

export default Index;
