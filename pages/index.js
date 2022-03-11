import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Layout, Page, Stack } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { LanguageSelector } from "../app/components";
import { EmptyProduct } from "../app/components/EmptyProduct";
import { InstallationStep } from "../app/components/InstallationStep";
import { Instructions } from "../app/components/Instructions";
import { ProductForm } from "../app/components/ProductForm";
import { useTranslations } from "../app/i18n";

const Index = () => {
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const t = useTranslations();

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
                {t("choose_product")}
              </Button>
            </Stack.Item>
            <Stack.Item>
              <LanguageSelector />
            </Stack.Item>
            <Stack.Item>
              <Button onClick={() => setShowInstructions(true)}>
                {t("instructions")}
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
