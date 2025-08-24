"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import Link from "next/link";
import { useContext } from "react";
import Header from "../../components/Header.jsx";

const AboutUs = () => {
  const { inEng } = useContext(Context)
  return (
    <div className="relative border-x-[10px] border-[#1C2532] py-20 px-4">
      <div className="relative z-10 bg-black/30 backdrop-blur-md rounded-xl p-10 mx-auto shadow-2xl max-w-6xl">
        <Header title={inEng ? `About us` : `আমাদের সম্পর্কে`} />
        <br />
        <div className="flex flex-col md:flex-row items-center gap-10">

          <div className="flex-1 text-center md:text-left mb-[10px]">
            {inEng ? (<p className="text-base sm:text-lg text-[black] text-left sm:text-justify px-2 sm:px-0 md:pl-10">
              Every year, Bangladesh wastes millions of Taka worth of food, while many people struggle to get daily meals. Our primary goal is to prevent this waste and, at the same time, support the poor and hungry. We focus not only on saving food but also on ensuring it reaches those who need it most. Our operations mainly work on two levels—collecting and distributing food, and expanding support through donors and volunteers....
            </p>) : (<p className="text-base sm:text-lg text-[black] text-left sm:text-justify px-2 sm:px-0 md:pl-10">
              বাংলাদেশে প্রতি বছর কোটি কোটি টাকার খাবার অপচয় হয়, যখন দেশের বহু মানুষ প্রতিদিনের খাবারের জন্য সংগ্রাম করছেন। আমাদের মূল উদ্দেশ্য হল এই অপচয় রোধ করা এবং সেই সঙ্গে দরিদ্র ও ক্ষুধার্ত মানুষদের সহায়তা করা। আমরা শুধু খাবার বাঁচানোর দিকে মনোনিবেশ করি না; আমরা চাই সেই খাবার সঠিকভাবে পৌঁছাক যেখানে এর সবচেয়ে বেশি প্রয়োজন। আমাদের কার্যক্রম মূলত দুইটি স্তরে কাজ করে—খাবার সংগ্রহ এবং বিতরণ, এবং দাতা ও স্বেচ্ছাসেবকদের মাধ্যমে সহায়তা সম্প্রসারণ।
            </p>
            )}

            <div className="mt-8 px-2 sm:px-0 md:pl-10 text-center md:text-left">
              <Link href="/pages/about">
                <button className="bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-6 py-3 rounded-full transition-all duration-300">
                  {inEng ? `Learn More` : `আরও জানুন`}
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
