// src/api/productApi.js

// Use Render backend URL
const BACKEND_URL = "https://gmj-haircare-products-backend.onrender.com";
const API_BASE_URL = `${BACKEND_URL}/api/products`;

// -----------------------------
// GET All Products (Read)
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      const errorDetail = await response.json().catch(() => ({}));
      throw new Error(errorDetail.error || "Failed to fetch products.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// -----------------------------
// POST New Product (Create)
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorDetail = await response.json().catch(() => ({}));
      throw new Error(errorDetail.error || "Failed to create product.");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// -----------------------------
// PUT Product (Update)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorDetail = await response.json().catch(() => ({}));
      throw new Error(errorDetail.error || `Failed to update product ${id}.`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// -----------------------------
// DELETE Product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return true;
    }

    const errorDetail = await response.json().catch(() => ({}));
    throw new Error(errorDetail.error || `Failed to delete product ${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
