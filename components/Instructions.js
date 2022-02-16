import { Modal, TextContainer } from "@shopify/polaris";
import React from "react";

export function Instructions({ showInstructions, setShowInstructions }) {
  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={showInstructions}
        title="Instructions"
        onClose={() => setShowInstructions(false)}
      >
        <Modal.Section>
          <TextContainer>
            <h6>Follow these steps to use the app</h6>
            <p>
              <strong>Step 1 </strong>Choose a product you want to add a
              canonical tag for.
            </p>
            <p>
              <strong>Step 2 </strong>Add the URL for the product in the field
              and save.
            </p>
            <p>
              <strong>Step 3 </strong>
              You can check your product page to have an updated canonical tag
              (You can use online canonical URL checkers).
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
