"use client";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    alert("Payment Cancelled!");
  }, []);

  return (
    <div className="text-center mt-10 text-yellow-600 font-bold">
      Payment Cancelled ⚠️
    </div>
  );
};

export default page;
