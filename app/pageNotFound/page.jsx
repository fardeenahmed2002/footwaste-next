import React from 'react';
export const generateMetadata = async () => {
    return {
        title: '404 page not found'
    }
}

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF7E6] p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-2">
        Sorry, we couldn’t find the page you're looking for.
      </p>
      <a
        href="/"
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Page;
