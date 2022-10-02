import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackwardsNavbar from "../../../backwardsNavbar";
import { AdminMenuItems } from "../../../../pages/dashboard";
import Image from "next/image";

type ProductDetailsProps = {
  selectedProduct: string | null;
  toggleShowDetails: () => void;
};

type ProductFormDataType = {
  [index: string]: string | string[] | File[];
  name: string;
  description: string;
  price: string;
  categories: string[];
  images: File[];
  tags: string[];
};

const ImageUploadPreview: React.FC<{ images: File[] }> = ({ images }) => {
  return (
    <div className="carousel-image-container">
      {images.map((img, index) => {
        const imgUrl = URL.createObjectURL(img);
        return (
          <div key={index} className="mx-2 min-w-fit">
            <Image width={80} height={50} src={imgUrl} alt={img.name} />
          </div>
        );
      })}
      {images.length < 1 && (
        <div className="flex flex-row items-center justify-center mx-2 h-14 w-full rounded bg-slate-200">
          <span className="text-slate-500">No images selected</span>
        </div>
      )}
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedProduct,
  toggleShowDetails,
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [currentTag, setTag] = useState<string>();
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
    const imageFiles: File[] = [];

    for (let i = 0; i < uploadedImages.length; i++) {
      imageFiles.push(uploadedImages[i]);
    }

    setFormData({ ...formData, images: [...formData.images, ...imageFiles] });
  };

  const handleCategoriesAndTags = (field: string, value: string) => {
    if (field === "categories") {
      setCurrentCategory(value);
    } else {
      setTag(value);
    }
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;

    if (field) {
      if (field === "images") {
        handleImageUpload(target);
      } else if (field === "categories" || field === "tags") {
        setFormData({ ...formData, [field]: [...formData[field], value] });
      } else {
        setFormData({ ...formData, [field]: value });
      }
    }
  };

  const onCancelForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleShowDetails();
  };

  const appendArrayValueToFormData = (
    array: string[] | File[],
    formDataLabel: string,
    formData: FormData
  ) => {
    array.forEach((value) => {
      formData.append(formDataLabel, value);
    });
  };

  const parseSubmittedFormData = (submittedData: ProductFormDataType) => {
    const formDataKeyArray = Object.keys(submittedData);
    const parsedFormData = new FormData();

    formDataKeyArray.forEach((key) => {
      const itemValue = submittedData[key];
      if (Array.isArray(itemValue)) {
        switch (key) {
          case "categories":
            appendArrayValueToFormData(itemValue, "category", parsedFormData);
            break;

          case "images":
            appendArrayValueToFormData(itemValue, "image", parsedFormData);
            break;

          case "tags":
            appendArrayValueToFormData(itemValue, "tag", parsedFormData);
            break;
        }
      } else {
        parsedFormData.append(key, itemValue);
      }
    });

    return parsedFormData;
  };

  const onSubmit = async () => {
    const parsedFormData = parseSubmittedFormData(formData);

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer test`,
      },
      body: parsedFormData,
    });
    const result = await resp.json();
    console.log("result:", result);
  };

  return (
    <div className="flex flex-col h-full w-screen">
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

          <div className="flex flex-col w-full my-3">
            <label>Images</label>
            <ImageUploadPreview images={formData.images} />
            <input
              className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
              type="file"
              placeholder="Product images..."
              data-field="images"
              accept="image/*"
              multiple
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
