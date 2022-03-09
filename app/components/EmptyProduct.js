import { EmptyState } from "@shopify/polaris";
const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

export function EmptyProduct({ setOpen }) {
  return (
    <EmptyState
      heading="Canonical Tag"
      image={img}
      action={{
        content: "Choose Product",
        onAction: setOpen,
      }}
    >
      <p>Select products to change their canonical tag.</p>
    </EmptyState>
  );
}
