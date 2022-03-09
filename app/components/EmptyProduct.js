import { EmptyState } from "@shopify/polaris";
import { useTranslations } from "../i18n";
const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

export function EmptyProduct({ setOpen }) {
  const t = useTranslations();
  return (
    <EmptyState
      heading="Canonical Tag"
      image={img}
      action={{
        content: t("choose_product"),
        onAction: setOpen,
      }}
    >
      <p>{t("select_product_msg")}</p>
    </EmptyState>
  );
}
