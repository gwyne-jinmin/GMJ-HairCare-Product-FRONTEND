// src/pages/ProductList.jsx
import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Create Product
  const handleCreate = async (productData) => {
    if (!productData.name || productData.price === undefined) {
      alert("Name and price are required!");
      return;
    }
    try {
      await createProduct(productData);
      fetchProducts();
      alert("Product created successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Error creating product.");
    }
  };

  // Update Product
  const handleUpdate = async (productData) => {
    if (!productData.name || productData.price === undefined) {
      alert("Name and price are required!");
      return;
    }
    try {
      await updateProduct(productData.id, productData);
      setEditingProduct(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message || "Error updating product.");
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this product?`)) return;
    try {
      await deleteProduct(id);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message || "Error deleting product.");
    }
  };

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="product-page">
      <h1>GMJ Haircare Products</h1>

      <section className="form-section">
        <ProductForm
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          initialData={editingProduct || {}}
          isUpdate={!!editingProduct}
        />

        {editingProduct && (
          <button className="btn-cancel" onClick={() => setEditingProduct(null)}>
            Cancel Edit
          </button>
        )}
      </section>

      <section className="list-section">
        <h2>Available Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={setEditingProduct}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;
