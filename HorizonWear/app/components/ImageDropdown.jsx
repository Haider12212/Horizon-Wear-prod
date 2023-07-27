import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onUploadComplete }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('upload_preset', 'scctmgml');
      formData.append('cloud_name', 'dcpuaddce');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dcpuaddce/image/upload',
        formData
      );

      // Assuming the Cloudinary response returns a URL for the uploaded image.
      const uploadedImageUrl = response.data.secure_url;

      setUploadedImages((prevImages) => [
        ...prevImages,
        {
          url: uploadedImageUrl,
          uploaded: true,
        },
      ]);

      // Call the callback function with the updated array of secure URLs
      const imageURLs = uploadedImages.map((image) => image.url); // Get the array of URLs
      onUploadComplete(imageURLs); // Pass the imageURLs to the callback
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, [onUploadComplete, uploadedImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='m-5'>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #aaa',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop images here, or click to select files</p>
        )}
      </div>
      {uploadedImages.map((image, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <img
            src={image.url}
            alt={`Thumbnail ${index}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          {image.uploaded ? (
            <span style={{ marginLeft: '10px', color: 'green' }}>✔️</span>
          ) : (
            <span style={{ marginLeft: '10px', color: 'red' }}>❌</span>
          )}
          {image.uploaded && (
            <button
              onClick={() => {
                // setUploadedImages((prevImages) => prevImages.filter((img) => img.url !== image.url));
              }}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
