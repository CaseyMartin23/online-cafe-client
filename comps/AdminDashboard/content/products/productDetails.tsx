import React from "react";

type ProductDetailsProps = {
  selectedProduct: string;
  toggleShowDetails: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({}) => {
  return (
    <div>
      <div>Product Details</div>
    </div>
  );
};

export default ProductDetails;
