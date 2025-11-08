import React from 'react';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="text-center p-8">
        <h1 className="text-9xl font-extrabold text-primary opacity-50">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-bold text-base-content">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        {/* <img 
          src="https://i.ibb.co/ck1SGFJ/lost-person.png" 
          alt="Lost" 
          className="w-64 h-auto mx-auto my-8"
        /> */}

        <div className="mt-10">
          <Link
            to="/"
            className="btn btn-primary btn-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform transition-transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;