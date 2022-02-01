import { Layout, Page } from "@shopify/polaris";
import { useState } from "react";
import { EmptyProduct } from "../components/EmptyProduct";
import { ProductForm } from "../components/ProductForm";

const Index = () => {
  const [product, setProduct] = useState({});
  return (
    <Page>
      <Layout>
        {product ? (
          <ProductForm product={product} />
        ) : (
          <EmptyProduct setProduct={setProduct} />
        )}
      </Layout>
    </Page>
  );
};

export default Index;
