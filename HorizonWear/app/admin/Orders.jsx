import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderNo'); // Default sort by orderNo
  const [sortOrder, setSortOrder] = useState('asc');

  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/order');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on the search term
    const filtered = orders.filter(
      (order) =>
        order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      // Add other fields you want to search here
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/api/order`, {
        _id: orderId,
        status: newStatus,
      });
      console.log(response);
  
      if (response.status === 200) {
        alert('Status updated successfully');
  
        // Assuming setStatus and setOrders are correctly defined in the parent component
        setStatus(newStatus);
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          })
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status. Please try again later.');
    }
  };
  

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Sort the filteredOrders array based on the selected sorting criteria
  const sortedOrders = filteredOrders
  .filter((order) => order.status !== 'completed') // Filter out completed orders
  .sort((a, b) => {
    const compareResult =
      sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    return compareResult;
  });
  
    return (
      <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Full Name or Email"
          className="px-4 py-2 border border-gray-300 rounded mb-2"
        />
        <label className="mr-2">Sort By:</label>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="orderNo-asc">Order Number (Ascending)</option>
          <option value="orderNo-desc">Order Number (Descending)</option>
          {/* Add other sorting options here based on your requirements */}
        </select>
      </div>
        {sortedOrders.map((order) => (
          <div key={order._id} className="bg-white shadow-md p-4 mb-4 rounded-lg border-t-4 border-green-500">
            <p className="font-bold text-xl text-green-600">Order No: {order.orderNo}</p>
            <p className="text-brown-700">Full Name: {order.fullName}</p>
            <p className="text-brown-700">Email: {order.email}</p>
            <p className="text-brown-700">Address: {order.address}</p>
            <p className="text-brown-700">Phone No: {order.phoneNo}</p>
            <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Product Quantity</th>
              <th className="px-4 py-2">Product Image</th>
            </tr>
          </thead>
          <tbody>
            {order.Products.map((productId, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{productId}</td>
                <td className="border px-4 py-2">{order.ProductName[index]}</td>
                <td className="border px-4 py-2">{order.ProductQuantity[index]}</td>
                <td className="border px-4 py-2">
                  <img
                    src={order.ProductImage[index]}
                    alt={`Product ${index + 1}`}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <p className="text-brown-700">Total Amount: {order.totalAmount}</p>
            <p className="text-brown-700">
              Status:
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded "
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </p>
          </div>
        ))}
      </div>
    );
  };