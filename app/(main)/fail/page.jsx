"use client";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    alert("Payment Failed! আবার চেষ্টা করুন।");
  }, []);

  return (
    <div className="text-center mt-10 text-red-600 font-bold">
      Payment Failed ❌
    </div>
  );
};

export default page;
