import React from 'react';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="loading loading-spinner text-neutral"></span>
    </div>
  );
};

export default Spinner;
