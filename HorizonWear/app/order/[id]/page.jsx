'use client'
import React from "react";
import { useParams } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { VscError } from "react-icons/vsc";

const OrderConfirmation = () => {
  const { id } = useParams();
  const { placedOrder } = useContext(CartContext);

  if (placedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white rounded-lg shadow-lg p-8 transform scale-100 hover:scale-105 transition-transform">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500 mx-auto mb-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.707 6.293a1 1 0 1 1 1.414 1.414L8 14.414l-3.121-3.121a1 1 0 0 1 1.414-1.414L8 11.586l3.293-3.293a1 1 0 0 1 1.414 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              Order Confirmed
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Thank you for your order! Your order is being processed.
            </p>
            <p className="text-4x font-bold">Your Order Id is {id}</p>
            <p className="text-gray-600">We will keep you updated via email.</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white rounded-lg shadow-lg p-8 transform scale-100 hover:scale-105 transition-transform">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-red-500 flex items-center justify-center flex-col">
              <VscError className="inline-block text-red-500 mr-2 text-4xl mb-1" />
              Invalid Order Number
            </h1>
            <p className="text-xl text-red-500 mb-8">
              The provided order number does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderConfirmation;
