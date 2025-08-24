'use client';

import { Context } from '@/app/contextapi/ContextProvider';
import { Parkinsans, Roboto_Condensed } from "next/font/google";
import { useContext } from 'react';
import Link from 'next/link';
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
});
const parkinsans = Parkinsans({
  subsets: ['latin'],
});

export default function Introduction() {
  const { inEng } = useContext(Context)
  return (
    <div
      className="relative w-full min-h-[360px] flex items-center justify-center px-4 sm:px-6 md:px-12 bg-[#1C2532]"

    >
      
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
            ${robotoCondensed.className} mb-6 text-white
          `}
        >
          {inEng ? `Our Mission` : `আমাদের লক্ষ্য `}
        </h1>

        <p
          className={`
            mt-6 hidden sm:block text-base md:text-lg text-white
            ${parkinsans.className}
            leading-relaxed
          `}
        >
          {inEng ? `Every year, Bangladesh wastes millions of Taka worth of food, while many people struggle to get daily meals. Our primary goal is to prevent this waste and, at the same time, support the poor and hungry. We focus not only on saving food but also on ensuring it reaches those who need it most. Our operations mainly work on two levels—collecting and distributing food, and expanding support through donors and volunteers.` : `বাংলাদেশে প্রতি বছর কোটি কোটি টাকার খাবার অপচয় হয়, যখন দেশের বহু মানুষ প্রতিদিনের খাবারের জন্য সংগ্রাম করছেন। আমাদের মূল উদ্দেশ্য হল এই অপচয় রোধ করা এবং সেই সঙ্গে দরিদ্র ও ক্ষুধার্ত মানুষদের সহায়তা করা। আমরা শুধু খাবার বাঁচানোর দিকে মনোনিবেশ করি না; আমরা চাই সেই খাবার সঠিকভাবে পৌঁছাক যেখানে এর সবচেয়ে বেশি প্রয়োজন। আমাদের কার্যক্রম মূলত দুইটি স্তরে কাজ করে—খাবার সংগ্রহ এবং বিতরণ, এবং দাতা ও স্বেচ্ছাসেবকদের মাধ্যমে সহায়তা সম্প্রসারণ।`}
        </p>

        <Link
        href={`/signup`}
          className="
            mt-8
            bg-[#FFC808] text-black hover:text-[#FFC808] border-1 border-[#FFC808] hover:bg-[#1C2532]
            px-8 py-3 rounded-lg
             font-semibold
            transition-all
            w-full max-w-xs sm:w-auto
          "
        >
          {inEng ? `Join With Us` : `আমাদের সাথে যোগ দিন`}
        </Link>
      </div>
    </div>
  )
}
