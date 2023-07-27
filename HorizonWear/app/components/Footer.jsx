import React from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-auto">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            {/* Footer content goes here */}
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
          <Image src={logo} alt="logo" width={50} height={50} />
              <span className="self-center text-2xl pl-5 font-semibold whitespace-nowrap dark:text-white">Horizon Wear</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Horizon Wear   ™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
