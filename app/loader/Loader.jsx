import React from 'react';

const Loader = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="text-sm text-black font-medium animate-pulse">
                {message}
            </p>
        </div>
    );
};

export default Loader;
