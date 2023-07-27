import React, { useState, useEffect } from 'react';
import { AddProduct } from './AddProduct';
import ManageCategories from './ManageCategories';
import ManageProducts from './ManageProducts';
import CompletedOrders from './CompletedOrders';
import { Orders } from './Orders';

const Sidebar = () => {
  const [activeOption, setActiveOption] = useState(1);

  // Helper function to render the content based on activeOption
  const renderContent = () => {
    switch (activeOption) {
      case 1:
        return <AddProduct />;
      case 2:
        return <ManageCategories />;
      case 3:
        return <ManageProducts />;
      case 4:
        return <Orders />;
      case 5:
        return <CompletedOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white w-1/6 h-screen py-8 px-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li
            className={`mb-2 p-2 cursor-pointer ${
              activeOption === 1 ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveOption(1)}
          >
            Add Product
          </li>
          <li
            className={`mb-2 p-2 cursor-pointer ${
              activeOption === 2 ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveOption(2)}
          >
            Manage Categories
          </li>
          <li
            className={`mb-2 p-2 cursor-pointer ${
              activeOption === 3 ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveOption(3)}
          >
            Manage Products
          </li>
          <li
            className={`mb-2 p-2 cursor-pointer ${
              activeOption === 4 ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveOption(4)}
          >
            Orders
          </li>
          <li
            className={`mb-2 p-2 cursor-pointer ${
              activeOption === 5 ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveOption(5)}
          >
            Completed Orders
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
