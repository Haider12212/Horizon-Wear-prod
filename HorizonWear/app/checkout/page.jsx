"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import Cart from "../components/Cart";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillCreditCard } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {FiSmartphone} from "react-icons/fi";
import axios from "axios";
import { signIn } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const {
    cart,
    calculateTotalPrice,
    shippingCost,
    setShippingCost,
    placedOrder,
    setPlacedOrder
  } = useContext(CartContext);
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [pId, setpId] = useState([]);
  const productIds = cart.map(item => item._id);
  const productname = cart.map(item => item.title);
  const productquantity = cart.map(item => item.itemQuantity);
  const productImages = cart.map(item => item.images[0]);
  

  

const  handlePlaceOrder = async () => {
  setIsLoading(true);
  const generaterRandomNumber = () => {
    return Math.floor(Math.random() * 12500000000000000);
  };

  const orderNo = generaterRandomNumber();
  try{
    const response = await axios.post("/api/order", {
      orderNo: orderNo,
      fullName: fullName,
      email: session.user.email,
      address: address,
      phoneNo: contactNumber,
      Products: productIds,
      ProductName: productname,
      ProductQuantity: productquantity,
      ProductImage: productImages,
      totalAmount: +calculateTotalPrice() + shippingCost,
      status: "pending"
    });
    if(response.status === 200){
      // reseting the cart
      localStorage.setItem("cart", JSON.stringify([]));
      router.push(`/order/${orderNo}`)
      setPlacedOrder(true);
    }
    else{
      alert("something went wrong");
    }
  }catch(error){
    console.log(error);
  }finally {
    setIsLoading(false);
  }
};

useEffect(() => {
cart.forEach((product) => {
    setpId((pId) => [...pId, product._id]);
  });
  
}, []);



  const handleContinueShopping = () => {
    router.push("/");
  };
  if (calculateTotalPrice() > 3500 && shippingCost !== 0) {
    setShippingCost(0);
  }

  // Loading state
  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return (
      <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">You are not logged in</h1>
        <p class="text-lg text-gray-600 mb-8">Please login to access the content.</p>
        <a onClick={()=>signIn()} class="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Login</a>
      </div>
    </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">You got nothing in the bag!</h1>
        <p class="text-lg text-gray-600 mb-8">Add Something</p>
        <a onClick={()=>handleContinueShopping()} class="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Continue Shopping</a>
      </div>
    </div>
    );
  }

  return (
    <div>
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div class="relative">
            <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span class="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span class="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span class="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {cart.map((product) => (
            <Cart
              image={product.images[0]}
              title={product.title}
              category={product.category}
              quantity={product.itemQuantity}
              price={product.price}
            />
          ))}
          <p class="mt-8 text-lg font-medium">Shipping Methods</p>
          <form class="mt-5 grid gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <TbTruckDelivery size={50} />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Cash on Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <AiFillCreditCard size={50} />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Debit/Credit Card</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Details</p>
          <p class="text-gray-400">
            Complete your order by providing your details.
          </p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div class="relative">
              <input
                type="text"
                id="email"
                name="email"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                disabled
                value={session.user.email}
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Full Name
            </label>
            <div class="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                onChange={(e) => setFullName(e.target.value)}
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
              Address
            </label>
            <div class="flex">
              <div class="relative w-full flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <label for="contact-no" class="mt-4 mb-2 block text-sm font-medium">
              Contact Number
            </label>
            <div class="flex">
              <div class="relative w-full flex-shrink-0">
                <input
                  type="text"
                  id="contact-no"
                  name="contact-no"
                  class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FiSmartphone size={20} />
                </div>
              </div>
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">
                  Rs. {calculateTotalPrice()}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">Rs. {shippingCost}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">
                Rs. {+calculateTotalPrice() + shippingCost}
              </p>
            </div>
          </div>
          <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" disabled={isLoading} onClick={handlePlaceOrder}>
          {isLoading ? 'Loading...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
