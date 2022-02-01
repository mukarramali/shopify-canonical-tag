import { ResourcePicker } from "@shopify/app-bridge-react";
import { EmptyState } from "@shopify/polaris";
import { useCallback, useState } from "react";
const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

export function EmptyList() {
  const [open, setOpen] = useState(false);
  const handleSelection = useCallback((resources) => {
    setOpen(false);
    console.log(resources);
  }, []);

  return (
    <>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
        allowMultiple={false}
      />
      <EmptyState
        heading="Canonical Tag"
        action={{
          content: "Select Product",
          onAction: () => setOpen(true),
        }}
        image={img}
      >
        <p>Select products to change their canonical tag.</p>
      </EmptyState>
    </>
  );
}
