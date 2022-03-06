import { Banner, Modal, TextContainer } from "@shopify/polaris";
import React from "react";
import { useBlockDetection, useSearchParams } from "./hooks";

const EXTENSION_UUID = "b540615e-1f76-4afc-a5d3-40ce6cdff70f";

export function InstallationStep() {
  const { shop: shopifyDomain = "" } = useSearchParams();
  const isActive = useBlockDetection();

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={!isActive}
        title="Installation Step"
        primaryAction={{
          content: "Update Theme",
          url: `https://${shopifyDomain}/admin/themes/current/editor?context=apps&template=product&activateAppId=${EXTENSION_UUID}/canonicalTag`,
          external: true,
        }}
      >
        <Modal.Section>
          <Banner title="Looks like your theme isn't updated yet! If you did follow below link and saved already, then just refresh." />
        </Modal.Section>
        <Modal.Section>
          <TextContainer>
            <p>
              To include canonical tag, Shopify theme need to enable this
              extension. <strong>Update Theme</strong> link will take you to
              your themes settings where you can click on <strong>Save</strong>{" "}
              on top right .
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
