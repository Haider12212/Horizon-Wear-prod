import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function CartDropdown({ setOpen }) {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice,setShippingCost } = useContext(CartContext);
  
  const handleCheckout = () => {
    if(calculateTotalPrice()>3500){
      setShippingCost(0);
    }
  }

  console.log(cart);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >

                            {/* if cart length is zero Write cart is empty in middle of page and give a link go back to shopping */
                            cart.length === 0 && (
                              <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl font-bold text-gray-700">
                                  Your cart is empty.
                                </h1>
                                <h1 className="text-2xl font-bold text-gray-700">
                                  Fill up the bag.
                                </h1>
                                {/* Close the cart */}
                                <button
                                  onClick={() => setOpen(false)}
                                  className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-md"
                                >
                                  Go back to shopping
                                </button>

                              </div>
                            ) }
                            {cart &&
                              cart.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.images[0]}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.title}
                                          </a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <button onClick={() => decreaseQuantity(product)}>-</button>
                                      <p className="text-gray-500">
                                        Qty {product.itemQuantity}
                                      </p>
                                      <button onClick={() => increaseQuantity(product)}>+</button>

                                      <div className="flex">
                                        <button
                                          onClick={() => removeFromCart(product)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{calculateTotalPrice()} Rs.</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">

                        <a
                          href="/checkout"
                          className="flex items-center disabled:bg-indigo-300 justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={handleCheckout}>
                        
                         Checkout 
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium pl-2 text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                          Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
