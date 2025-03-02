"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/product";
import { toast } from "react-hot-toast";

const Page = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const { createProduct } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.category || !newProduct.description) {
      toast.error("All fields are required", {
        duration: 1200,
        position: "top-right",
      });
      return; 
    }

    try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
    } catch (error) {
      toast.error("Failed to create product", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-96 shadow-md rounded-md p-6" onSubmit={handleSubmit}>
        <h2 className="sm:text-2xl text-lg font-semibold mb-7 text-center">
          Create a new product
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Product name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Product price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Product category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Product image"
            name="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Product description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <button className="w-full bg-primary text-white py-2 rounded-md" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
