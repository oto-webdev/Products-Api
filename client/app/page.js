"use client";
import { useProductStore } from '@/store/product';
import Link from 'next/link'; 
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(true); 
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  const [productId, setProductId] = useState("");

  const { fetchProducts, products, updateProduct: updateProductAction, deleteProduct } = useProductStore();

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!updateProduct.name || !updateProduct.price || !updateProduct.category || !updateProduct.image || !updateProduct.description) {
      toast.error("All fields are required", {
        duration: 1200,
        position: "top-right",
      });
      return;
    }

    try {
      await updateProductAction(productId, updateProduct);
    } catch (error) {
      toast.error("Failed to update product", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
    }
  };

  const handleEditClick = (product) => {
    setProductId(product._id); 
    setUpdateProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      await fetchProducts();  
      setLoading(false);  
    };

    getProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className='flex items-center gap-4 justify-center min-h-96'>
        <h2 className='text-xl font-semibold'>Loading...</h2>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='flex items-center gap-4 justify-center min-h-96'>
        <h2 className='text-xl font-semibold'>No products found?</h2>
        <Link href='/create'>
          <button className='border border-black px-4 py-2 rounded-lg hover:bg-primary hover:text-white duration-200 cursor-pointer'>
            Create a product
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className='mt-24 px-2 sm:px-12 lg:px-28'>
        <div className='flex flex-wrap justify-center items-center gap-4'>
          {
            products.map((product) => (
              <div key={product._id} className='flex flex-col items-center gap-2 border border-gray-300 p-4 rounded-lg md:w-64 md:h-96 w-72'>
                <img src={product.image} alt={product.name} className='w-48 h-48 object-cover' />
                <h2 className='text-lg font-semibold'>{product.name}</h2>
                <p className='text-gray-600'>Price: ${product.price}</p>
                <p className='text-gray-600'>Category: {product.category}</p>
                <p className='text-gray-600'>{product.description.split(" ").slice(0, 10).join(" ")}</p>

                <div className='flex items-center gap-8'>
                  <div>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger onClick={() => handleEditClick(product)}>Update</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Product</DialogTitle>
                          <DialogDescription>
                            Please fill in the details to update the product.
                          </DialogDescription>
                        </DialogHeader>
                        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                          <Input
                            type="text"
                            placeholder="Product Name"
                            value={updateProduct.name}
                            name="name"
                            onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                          />
                          <Input
                            type="number"
                            placeholder="Product Price"
                            value={updateProduct.price}
                            name="price"
                            onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                          />
                          <Input
                            type="text"
                            placeholder="Product Category"
                            value={updateProduct.category}
                            name="category"
                            onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
                          />
                          <Input
                            type="text"
                            placeholder="Product Image URL"
                            value={updateProduct.image}
                            name="image"
                            onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}
                          />
                          <Input
                            type="text"
                            placeholder="Product Description"
                            value={updateProduct.description}
                            name="description"
                            onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
                          />
                          <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white duration-200 rounded-md">
                            Save Changes
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
