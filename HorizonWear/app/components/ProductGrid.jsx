'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import CartDropdown from './CartDropdown';
import { CartContext } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';


export default function ProductGrid() {
  const [results, setResults] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, itemQuantity } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Add a loading state

  const notify = () => toast.success('Product has been added to cart 🚀', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setResults(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  


  // Store the fetched data in cache memory for efficient retrieval
  const cachedResults = useMemo(() => results, [results]);

 if(loading){
    return(
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <h2 className="text-2xl font-bold mb-4">We are always bringing 🔥 Products for you</h2>
          <h2 className="text-2xl font-bold mb-4">Just A little bit 🤞</h2>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cachedResults.map((product) => (
        <div key={product._id} className="border border-gray-200 rounded-md p-4 hover:shadow-lg">
        <Link href={`/product/${product.slug}`} key={product._id}>
          <div className="flex justify-center h-[20rem]">
            <div className="aspect-w-2 aspect-h-3 bg-cover">
              <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500">Rs. {product.price}</p>
            <div className="text-center">
              {product.stock === 0 ? (
                <span className="text-sm text-red-400">Out of Stock</span>
              ) : (
                <span className="text-sm text-green-400">Available in Stock {product.stock}</span>
              )}
            </div>
  
            <span className="text-sm text-gray-500">{product.category}</span>
            <br />
          </div>
        </Link>
        <div className="text-center">
          <button
            //if stock is zero then disable the button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart({ ...product, itemQuantity });
              notify(); // Call the notify function when the product is added to the cart
            }}
            className='bg-violet-800 disabled:bg-violet-200 text-white font-semibold py-3 px-16 mx-4 rounded-xl h-full'
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
        ))}

        {/* Render the CartDropdown component and pass the cartOpen state */}
        {cartOpen && <CartDropdown setOpen={setCartOpen} />}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
}
