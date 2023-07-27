'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import{ AiFillDelete} from 'react-icons/ai'

const ManageProducts = () => {
  // State to hold the products
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to update product stock
  const handleUpdateStock = async (productId, newStockValue) => {
  try {
    // Make PUT request to update stock
    //  await Product.findOneAndUpdate(filter, updateQuery,{new: true});
    // Make request body accordingly
console.log(productId, newStockValue)

    const response = await axios.put("api/products",
         {"_id": productId,
          "stock": newStockValue}
    )
    if(response.status===200){
      alert("Stock updated successfully");
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product._id === productId) {
            return { ...product, stock: newStockValue };
          }
          return product;
        })
      );
    }
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};
  
  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete("api/products", {data: {_id: productId}}
        );
      if (response.status === 200) {
        alert("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
      console.log(response)
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
    {products.map((product) => (
      <div key={product._id} className="border rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="mb-2">Price: {product.price}</p>
        <p className="mb-4">Stock: {product.stock}</p>
        <div className="flex flex-row space-x-2">
          <button
            className="flex-shrink px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleUpdateStock(product._id, product.stock + 1)}
          >
            Increase Stock
          </button>
          <button
            className="flex-shrink px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleUpdateStock(product._id, product.stock - 1)}
          >
            Decrease Stock
          </button>
          <button
            className="flex-shrink px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleUpdateStock(product._id, 0)}
          >
            Make Stock Unavailable
          </button>
          <button
            className="flex-shrink px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <AiFillDelete/>
          </button>
        </div>
      </div>
    ))}
  </div>
  

  );
};

export default ManageProducts;
