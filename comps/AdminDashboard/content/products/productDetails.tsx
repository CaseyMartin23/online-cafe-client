import React, { useState } from "react";
import { useRouter } from "next/router";
import BackwardsNavbar from "../../../backwardsNavbar";
import { AdminMenuItems } from "../../../../pages/dashboard";

type ProductDetailsProps = {
  selectedProduct: string | null;
  toggleShowDetails: () => void;
};

type ProductFormDataType = {
  name: string;
  description: string;
  price: string;
  categories: string[];
  images: string[];
  tags: string[];
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedProduct,
  toggleShowDetails,
}) => {
  const [formData, setFormData] = useState<ProductFormDataType>({
    name: "",
    description: "",
    price: "",
    categories: [],
    images: [],
    tags: [],
  });

  const handleImageUpload = async (target: EventTarget & HTMLInputElement) => {
    const { files } = target;
    const uploadedImages = files ? files : [];
    let fileFormData = new FormData();

    for (let i = 0; i < uploadedImages.length; i++) {
      fileFormData.append("file", uploadedImages[i]);
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/admin/product/images`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer test`,
        },
        body: fileFormData,
      }
    );
    const result = await resp.json();

    console.log("result:", result);
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;

    if (field === "images") {
      handleImageUpload(target);
    } else {
      console.log("input value:", value);
    }
  };

  const onCancelForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleShowDetails();
  };

  const onSubmit = () => {
    // handle submit
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white">
        <BackwardsNavbar
          onReturnClick={toggleShowDetails}
          label={selectedProduct ? "Product Details" : "New Product"}
        />
      </div>
      <div className="mx-3 my-4">
        <form className="px-4 py-3 rounded bg-white" onSubmit={onSubmit}>
          <div className="flex flex-col mb-3">
            <label>Name</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="text"
              placeholder="Product name..."
              data-field="name"
              value={formData.name}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-col my-3">
            <label>Description</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="text"
              placeholder="Product description..."
              data-field="description"
              value={formData.description}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-col my-3">
            <label>Price</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="text"
              placeholder="Product price..."
              data-field="price"
              value={formData.price}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-col my-3">
            <label>Images</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="file"
              placeholder="Product images..."
              data-field="images"
              accept="image/*"
              multiple
              value={formData.images}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-col my-3">
            <label>Categories</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="text"
              placeholder="Product categories..."
              data-field="categories"
              value={formData.categories}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-col my-3">
            <label>Tags</label>
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="text"
              placeholder="Product tags..."
              data-field="tags"
              value={formData.tags}
              onChange={onInputChange}
            />
          </div>

          <div className="flex flex-row w-full justify-end">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
              onClick={onCancelForm}
            >
              cancle
            </button>

            <button
              type="submit"
              className="bg-accent-color text-white px-4 py-2 rounded w-20"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
