import { Banner, Modal, TextContainer } from "@shopify/polaris";
import React from "react";
import { EXTENSION_UUID } from "../environment";
import { useBlockDetection, useSearchParams } from "../hooks";
import { useTranslations } from "../i18n";

export function InstallationStep() {
  const { shop: shopifyDomain = "" } = useSearchParams();
  const isActive = useBlockDetection();
  const t = useTranslations();

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={!isActive}
        title={t("installation_title")}
        primaryAction={{
          content: t("update_theme"),
          url: `https://${shopifyDomain}/admin/themes/current/editor?context=apps&template=product&activateAppId=${EXTENSION_UUID}/canonicalTag`,
          external: true,
        }}
      >
        <Modal.Section>
          <Banner title={t("installation_missing_msg")} />
        </Modal.Section>
        <Modal.Section>
          <TextContainer>
            <p>{t("installation_direction")}</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
