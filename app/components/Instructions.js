import { Modal, TextContainer } from "@shopify/polaris";
import React from "react";
import { useTranslations } from "../i18n";

export function Instructions({ showInstructions, setShowInstructions }) {
  const t = useTranslations();
  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={showInstructions}
        title={t("instructions")}
        onClose={() => setShowInstructions(false)}
      >
        <Modal.Section>
          <TextContainer>
            <h6>{t("instructions")}</h6>
            <p>
              <strong>Step 1 </strong>
              {t("instructions_step_1")}
            </p>
            <p>
              <strong>Step 2 </strong>
              {t("instructions_step_2")}
            </p>
            <p>
              <strong>Step 3 </strong>
              {t("instructions_step_3")}
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
