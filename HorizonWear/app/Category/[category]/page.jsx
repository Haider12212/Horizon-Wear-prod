'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'next/navigation'; // Use this import for useParams
import CartDropdown from '@/app/components/CartDropdown';
import { CartContext } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

async function getData() {
  const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Page = () => {
  const { category } = useParams(); // Access category directly using useParams
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { cart, addToCart, itemQuantity } = useContext(CartContext);
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
        const data = await getData();
        setProducts(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Store the fetched data in cache memory for efficient retrieval
  const cachedResults = useMemo(() => products, [products]);

  const itemsOutOfStock = cachedResults.filter((product) => product.category === category && product.stock === 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <h2 className="text-2xl font-bold mb-4">Please Wait 😢</h2>
          <h2 className="text-2xl font-bold mb-4">Just A little bit 🤞</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{category}</h1>
      {cachedResults.filter((product) => product.category === category).length === 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">We are currently working to bring more Products</h2>
          <h2 className="text-2xl font-bold mb-4">Please Check Back Soon 😢</h2>
          <h2 className="text-2xl font-bold mb-4">Or Maybe Buy T-Shirts 👇</h2>
          <Link href="/Category/T-Shirts">
            <button className='bg-violet-800 disabled:bg-violet-200 text-white font-semibold py-3 px-16 mx-4 rounded-xl h-full'>
              T Shirts Here
            </button>
          </Link>
          
          
        </div>
      )}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {cachedResults
    .filter((product) => product.category === category)
    .map((product) => (
      <div key={product._id} className="border border-gray-200 rounded-md p-2 hover:shadow-lg flex flex-col">
        <Link href={`/product/${product.slug}`} key={product._id}>
          <div className="aspect-w-2 aspect-h-3 bg-cover">
            <img src={product.images[0]} alt={product.name} className="max-h-50 object-contain" />
          </div>
          <h2 className="text-lg font-semibold my-1">{product.title}</h2>
          <div className="text-center">
              {product.stock === 0 ? (
                <span className="text-sm text-red-400">Out of Stock</span>
              ) : (
                <span className="text-sm text-green-400">Available in Stock {product.stock}</span>
              )}
            </div>
          <p className="text-gray-500 text-lg font-bold mb-2">Price: Rs.{product.price}</p>
          <span className="text-xs text-gray-500">{product.category}</span>
        </Link>
        <div className="text-center mt-auto">
          <button
            // if stock is zero then disable the button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart({ ...product, itemQuantity });
              notify(); // Call the notify function when the product is added to the cart
            }}
            className="bg-violet-800 disabled:bg-violet-200 text-white font-semibold py-2 px-8 rounded-xl"
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    ))}
</div>

      {/* Render the CartDropdown component and pass the cartOpen state */}
      {cartOpen && <CartDropdown setOpen={setCartOpen} />}
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
};

export default Page;
