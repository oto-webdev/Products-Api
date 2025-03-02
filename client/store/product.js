import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name || !newProduct.image || !newProduct.price || !newProduct.category || !newProduct.description
    ) {
      toast.error("All fields are required", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

      if (res.ok) {
        set((state) => ({ products: [...state.products, data] }));
        toast.success("Product created successfully", {
          duration: 1500,
          position: "top-right",
          isCloseable: true,
        });
      } else {
        throw new Error(data.message || "Product creation failed");
      }
    } catch (error) {
      toast.error("Failed to create product", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
    }
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    set({ products: data.data });

    if(!res.ok) {
        toast.error("Failed to fetch products", {
            duration: 1500,
            position: "top-right",
            isCloseable: true,
        })
    }
  },
  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
    const data = await res.json();

    if(res.ok) {
        set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
        toast.success("Product deleted successfully", {
            duration: 1500,
            position: "top-right",
            isCloseable: true,
        })
    }
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data.data } : product
        ),
      }));
      toast.success("Product updated successfully", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
    } else {
      toast.error("Failed to update product", {
        duration: 1500,
        position: "top-right",
        isCloseable: true,
      });
    }
  },
}));
