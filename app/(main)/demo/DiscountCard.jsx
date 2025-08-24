// components/DiscountCard.jsx
"use client";

import Image from "next/image";

const DiscountCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 max-w-md">
      {/* Image Section */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <Image
          src="https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/upload/coupon/NJ%20Eat%20And%20Fit%20_photo.jpg" // your uploaded image
          alt="NJ Eat And Fit"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1">
        <p className="text-xl font-bold text-blue-600">20% Discount</p>
        <p className="text-gray-500">@NJ Eat And Fit</p>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default DiscountCard;
