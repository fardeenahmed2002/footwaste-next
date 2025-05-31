import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="loading loading-spinner loading-lg"></span>
      <p className="text-sm text-white/80 font-medium animate-pulse">
        Posting food. Please wait....
      </p>
    </div>
  );
};

export default Loader;
