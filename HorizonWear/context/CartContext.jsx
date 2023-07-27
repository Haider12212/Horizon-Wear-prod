"use client"
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemQuantity , setitemQuantity]= useState(1);
  const [shippingCost,setShippingCost] = useState(300);
  const [placedOrder,setPlacedOrder] = useState(false);


  // Retrieve cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productToAdd) => {
    const existingProduct = cart.find((product) => product._id === productToAdd._id);

    if (existingProduct) {
      // If the product is already in the cart, we need to check if the total quantity exceeds the stock.
      const totalQuantity = existingProduct.itemQuantity + productToAdd.itemQuantity;
      if (totalQuantity > existingProduct.stock) {
        // If the total quantity exceeds stock, show a message or prevent adding to cart.
        console.log('Cannot add more items than available in stock.');
        alert('Cannot add more items than available in stock.');
        return;
      }

      // If total quantity is within the stock limit, update the quantity of the existing product in the cart.
      setCart((prevCart) =>
        prevCart.map((product) =>
          product._id === productToAdd._id ? { ...product, itemQuantity: totalQuantity } : product
        )
      );
    } else {
      // If the product is not already in the cart, we need to check if the itemQuantity exceeds stock.
      if (productToAdd.itemQuantity > productToAdd.stock) {
        // If the item quantity exceeds stock, show a message or prevent adding to cart.
        console.log('Cannot add more items than available in stock.');
        alert('Cannot add more items than available in stock.');
        return;
      }

      // If item quantity is within the stock limit, add the product to the cart.
      setCart((prevCart) => [...prevCart, productToAdd]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemToRemove._id));
  };

  const increaseQuantity = (itemToIncrease) => {
    // Check if increasing the quantity exceeds the stock limit
    if (itemToIncrease.itemQuantity + 1 > itemToIncrease.stock) {
      console.log('Cannot add more items than available in stock.');
      alert('Cannot add more items than available in stock.');
      return;
    }
  
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemToIncrease._id
          ? { ...item, itemQuantity: item.itemQuantity + 1 }
          : item
      )
    );
  };
  
  const decreaseQuantity = (itemToDecrease) => {
    // Check if decreasing the quantity goes below 1 (minimum allowed quantity)
    if (itemToDecrease.itemQuantity - 1 < 1) {
      console.log('Quantity cannot be less than 1.');
      return;
    }
  
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemToDecrease._id
          ? { ...item, itemQuantity: item.itemQuantity - 1 }
          : item
      )
    );
  };
  
  const calculateTotalPrice = () => {
    const total = cart.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.price) * product.itemQuantity;
    }, 0);
    return total.toFixed(2);
     // Format the total with two decimal places
  };
  const clearCart = () => {
    setCart([]);
  }
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity,itemQuantity,setitemQuantity, calculateTotalPrice,shippingCost, setShippingCost, clearCart,placedOrder,setPlacedOrder }}>
      {children}
    </CartContext.Provider>
  );
};
