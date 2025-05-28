'use client';

import React from 'react';
import { Roboto_Condensed, Parkinsans } from "next/font/google"
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
})
const parkinsans = Parkinsans({
  subsets: ['latin'],
});
export default function Introduction() {
  return (
    <div
      className="relative w-full bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: 'url(/aboutusmain.png)',
        paddingTop: `${(360 / 579) * 100}%`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className={`text-4xl md:text-6xl font-bold animate-heading ${robotoCondensed.className} pt-4`}>
          Our Mission
        </h1>
        <p className={`text-justify mt-6 text-base md:text-lg text-white ${parkinsans.className} w-full max-w-3xl`}>
          At our core, we are committed to reducing food waste, alleviating hunger, and fostering sustainability.
          Every year, billions of pounds of edible food are discarded while millions of people go without. Our mission is to change that. We rescue surplus food from farms, grocery stores, restaurants, manufacturers, and even from individual households—preventing it from ending up in landfills and causing unnecessary greenhouse gas emissions. This food is then repurposed and redistributed to individuals and families in need, offering them access to fresh, healthy, and nutritious meals.
          <br /><br />
          The journey of food waste reduction begins with partnerships. We collaborate with local businesses, farms, and organizations to gather surplus food, ensuring that it doesn’t go to waste. Our trained volunteers and staff members ensure the safe handling and distribution of this food, which is carefully sorted, packaged, and delivered to community centers, food banks, shelters, and directly to individuals facing food insecurity. This process not only helps reduce food waste but also strengthens local communities and supports vulnerable populations who may otherwise go hungry.
        </p>

        <button className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all">
          Join With Us
        </button>
      </div>
    </div>
  );
}
