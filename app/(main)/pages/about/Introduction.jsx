'use client';

import React from 'react';
import { Roboto_Condensed, Parkinsans } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
});
const parkinsans = Parkinsans({
  subsets: ['latin'],
});

export default function Introduction() {
  return (
    <div
      className="relative w-full min-h-[360px] flex items-center justify-center px-4 sm:px-6 md:px-12 bg-[#6baed6]/50"
      
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/background-veggie-pattern.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          opacity: 0.3,           
          pointerEvents: 'none',  
          zIndex: 0,
        }}
      />
    
      <div
        className={`
          relative z-10
          text-center max-w-4xl
          flex flex-col justify-center items-center
          py-12
        `}
      >
        <h1
          className={`
            text-3xl sm:text-4xl md:text-6xl font-bold animate-heading
            ${robotoCondensed.className} mb-6 text-black
          `}
        >
          Our Mission
        </h1>

        <p
          className={`
            mt-2 text-sm sm:hidden text-black
            ${parkinsans.className}
            leading-relaxed
          `}
        >
          We are committed to reducing food waste, alleviating hunger, and fostering sustainability. We rescue surplus food to help those in need.
        </p>
        <p
          className={`
            mt-6 hidden sm:block text-base md:text-lg text-black
            ${parkinsans.className}
            leading-relaxed
          `}
        >
          At our core, we are committed to reducing food waste, alleviating hunger, and fostering sustainability.
          Every year, billions of pounds of edible food are discarded while millions of people go without. Our mission is to change that. We rescue surplus food from farms, grocery stores, restaurants, manufacturers, and even from individual households—preventing it from ending up in landfills and causing unnecessary greenhouse gas emissions. This food is then repurposed and redistributed to individuals and families in need, offering them access to fresh, healthy, and nutritious meals.
        </p>

        <button
          className="
            mt-8
            bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532]
            px-8 py-3 rounded-lg
             font-semibold
            transition-all
            w-full max-w-xs sm:w-auto
          "
        >
          Join With Us
        </button>
      </div>
    </div>
  )
}
