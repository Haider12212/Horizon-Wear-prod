"use client"
import { useState, useEffect, useMemo, useContext } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CartContext } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const [images, setImages] = useState({});
  const { slug } = useParams();
  const { cart, addToCart, itemQuantity, setitemQuantity } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [results, setResults] = useState([]);
  const [activeImg, setActiveImage] = useState(null);


  useEffect(() => {
    // Check if the product is already in the results state
    const existingProduct = results.find((product) => product.slug === slug);
    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      // Fetch the product from the API if not already available in the results state
      const fetchData = async () => {
        try {
          const response = await fetch('/api/products');
          const data = await response.json();
          setResults(data);
          const product = data.find((product) => product.slug === slug);
          setProduct(product);
          setImages(product.images);
        } catch (error) {
          console.log('Error fetching products:', error);
        }
      };
      fetchData();
    }
  }, []);

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

  if (!product) {
    return <p>Loading...</p>;
  }
  const handleThumbnailClick = (index) => {
    const imageKeys = Object.keys(images);
    if (imageKeys.length > index) {
      setActiveImage(images[imageKeys[index]]);
    }
  };


  return (
    <div>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col pl-5 gap-6 lg:w-2/4'>
          <img
            src={activeImg || images[0]} // Use activeImg if available, else fallback to the first image
            alt=''
            className='w-[500px] h-[500px] aspect-square object-cover rounded-xl justify-center'
          />
          <div className='flex flex-row flex-start space-x-10 h-24'>
            {/* Thumbnails */}
            {Object.keys(images).map((key, index) => (
              <img
                key={index}
                src={images[key]}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded-md ${activeImg === images[key] ? 'border-2 border-violet-600' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4 lg:w-2/4'>
          <div>
            <span className='text-violet-600 font-semibold'>{product.category}</span>
            <h1 className='text-3xl font-bold'>{product.title}</h1>
            
          </div>
            <h1 className='text-xl font-bold'>Description</h1>
          <p className='text-gray-700'>{product.description}</p>
          <div className="text-center">
              {product.stock === 0 ? (
                <span className="text-sm text-red-400">Out of Stock</span>
              ) : (
                <span className="text-sm text-green-400">Available in Stock {product.stock}</span>
              )}
            </div>
          <h6 className='text-2xl font-semibold'>PKR {product.price}</h6>
          <div className='flex flex-row items-center gap-12'>
            <div className='flex flex-row items-center'>
              {/* Quantity buttons */}
              <button
                onClick={() => setitemQuantity((prevAmount) => Math.max(prevAmount - 1, 1))}
                className='border border-gray-400 px-3 py-1 rounded-md'
              >
                -
              </button>
              <span className='space-x-4 mx-10'>{itemQuantity}</span>
              <button
                onClick={() => setitemQuantity((prevAmount) => prevAmount + 1)}
                className='border border-gray-400 px-3 py-1 rounded-md'
              >
                +
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
