import React, { useState } from "react";
import ProductDetails from "./productDetails";
import ProductsDisplay from "./productsDisplay";

const Products = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const onProductSelection = (productId: string) => {
    setSelectedProduct(productId);
  };

  return (
    <>
      {showDetails ? (
        <ProductDetails
          selectedProduct={selectedProduct}
          toggleShowDetails={toggleShowDetails}
        />
      ) : (
        <ProductsDisplay
          onProductSelect={onProductSelection}
          toggleShowDetails={toggleShowDetails}
        />
      )}
    </>
  );
};

export default Products;
