import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductDetails from "./productDetails";
import ProductsDisplay from "./productsDisplay";
import { AdminMenuItems } from "../../../../pages/dashboard";

const Products = () => {
  const { query, push } = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const toggleShowDetails = () => {
    const lowerCaseProducts = AdminMenuItems.Products.toLocaleLowerCase();
    if (showDetails) {
      push(`/dashboard?show=${lowerCaseProducts}&content=list`);
      setShowDetails(!showDetails);
    } else {
      push(`/dashboard?show=${lowerCaseProducts}&content=form`);
      setShowDetails(!showDetails);
    }
  };

  const toggleProductSelection = (productId?: string) => {
    if (!selectedProduct && productId) {
      setSelectedProduct(productId);
    } else {
      setSelectedProduct(null);
    }
  };

  const onShowDetailsReturn = () => {
    toggleShowDetails();
    toggleProductSelection();
  };

  useEffect(() => {
    const queryContent = query.content;
    if (query && query.show && queryContent) {
      if (queryContent === "form") {
        setShowDetails(true);
      } else {
        setShowDetails(false);
      }
    }
  }, [query]);

  return (
    <>
      {showDetails ? (
        <ProductDetails
          selectedProduct={selectedProduct}
          toggleShowDetails={onShowDetailsReturn}
        />
      ) : (
        <ProductsDisplay
          onProductSelect={toggleProductSelection}
          toggleShowDetails={toggleShowDetails}
        />
      )}
    </>
  );
};

export default Products;
