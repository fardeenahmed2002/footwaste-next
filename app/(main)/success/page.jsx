"use client";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    alert("Payment Successful! ধন্যবাদ আপনার দানের জন্য।");
  }, []);

  return (
    <div className="text-center mt-10 text-green-600 font-bold">
      Payment Successful ✅
    </div>
  );
};

export default page;
