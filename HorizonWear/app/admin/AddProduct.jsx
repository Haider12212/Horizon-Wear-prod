import React, { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageDropdown';
import axios from 'axios';
import { LiaCalendarPlusSolid } from 'react-icons/lia';




export const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); 
// Make Caterogies Array

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();
        const categoryNames = data.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  
  

  
  const handleImageUpload = (imageUrls) => {
    setImages(imageUrls);
  };

  const [uploadStatus, setUploadStatus] = useState([]);

  const handleUploadButton = async () => {
    try {
      // Get all files from the input of type file
      const acceptedFiles = document.querySelector('[type=file]').files;

      // Create an array to store upload status for each file
      const uploadStatusArray = [];

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'scctmgml');
        formData.append('cloud_name', 'dcpuaddce');

        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dcpuaddce/image/upload',
            formData
          );

          if (response.status === 200) {
            // If successfully uploaded, add the URL to the images array
            const imageUrl = response.data.secure_url;
            setImages((prevImages) => [...prevImages, imageUrl]);
            console.log(imageUrl);
            // Update the upload status for this file to "success"
            uploadStatusArray.push({ file: file.name, status: 'success' });
          }
        } catch (error) {
          // If there's an error in uploading, update the status to "failure"
          uploadStatusArray.push({ file: file.name, status: 'failure' });
          console.log(error);
        }
      }

      // Update the upload status state with the new array
      setUploadStatus(uploadStatusArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to display the uploaded files with their status
  const renderUploadedFiles = () => {
    // Combine the images array with the uploadStatus array
    const allFiles = [...images, ...uploadStatus];
  
    return allFiles.map((item, index) => (
      <div key={index} className="flex items-center mb-2">
        {item.status === 'success' ? (
          <span className="text-green-500 mr-2">
            <LiaCalendarPlusSolid />
          </span>
        ) : (
          <span className="text-red-500 mr-2">X</span>
        )}
        <span>{item.file}</span>
      </div>
    ));
  };

  const handleSubmit = async () => {
  
  
    // Convert the images array to a JSON string and add it to the formData
  
    try {
      const response = await axios.post('http://localhost:3000/api/products', {
        title,
        description: productDetails,
        slug,
        price,
        images,
        category: selectedCategory,
        stock,

      });
      console.log(response);
      if (response.status === 200) {
        alert('Product added successfully');
      }
      // Reset the form
      setTitle('');
      setProductDetails('');
      setSlug('');
      setPrice('');
      setImages([]);
      setSelectedCategory('');
      setStock('');
      setUploadStatus([]); // Clear the upload status
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700">
          Product Details
        </label>
        <textarea
          id="productDetails"
          rows="4"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          slug
        </label>
        <input
          id="slug"
          rows="4"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stock" className="block vir text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          type="text"
          id="stock"
          className="p-2 mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input type="file" multiple name="file" id="" />
        <button
          onClick={handleUploadButton}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Upload
        </button>
      </div>

      {/* Display uploaded files */}
      <div className="mb-4">{renderUploadedFiles()}</div>

      {/* <ImageUploader onUploadComplete={handleImageUpload} /> */}

      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
};
