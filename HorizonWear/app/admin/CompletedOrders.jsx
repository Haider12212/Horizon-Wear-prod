import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const { data } = await axios.get('/api/order');
        const completedOrders = data.filter((order) => order.status === 'completed');
        setCompletedOrders(completedOrders);
      } catch (error) {
        console.error('Error fetching completed orders:', error);
      }
    };
    fetchCompletedOrders();
  }, []);
  const handleDeleteOrder = async (orderId) => {
    try {
      // Make an API request to delete the order with the given orderId
      const resp = await axios.delete("api/order", {data: {_id: orderId}});
      console.log(resp);
      if(resp.status === 200){
        alert("Order Deleted Successfully");
      }
      // After successful deletion, remove the deleted order from the state
      setCompletedOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Completed Orders List</h2>
      {completedOrders.length === 0 ? (
        <p>No completed orders found.</p>
      ) : (
        completedOrders.map((order) => (
          <div key={order._id} className="bg-white shadow-md p-4 mb-4 rounded-lg border-t-4 border-blue-500">
            <p className="font-bold text-xl text-blue-600">Order No: {order.orderNo}</p>
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
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleDeleteOrder(order._id)}
            >
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedOrders;
