import React from "react";
import Button from "../../../button";
import SearchBar from "../../../search-bar/searchBar";

type ProductsDisplayProps = {
  onProductSelect: (productId: string) => void;
  toggleShowDetails: () => void;
};

const ProductDisplayItem: React.FC = () => {
  return (
    <div className="p-4 rounded bg-white">
      <div>Product item</div>
    </div>
  );
};

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  onProductSelect,
  toggleShowDetails,
}) => {
  const onAddProduct = () => {
    toggleShowDetails();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 bg-white">
        <SearchBar
          inputValue=""
          onInputChange={() => {}}
          onSearchSubmit={(e) => {
            e.preventDefault();
          }}
        />
      </div>
      <div className="flex flex-row p-2 justify-end">
        <Button
          text="Add Product"
          className="bg-accent-color text-white"
          onClick={onAddProduct}
        />
      </div>
      <div className="py-2 px-4">
        <ProductDisplayItem />
      </div>
    </div>
  );
};

export default ProductsDisplay;
