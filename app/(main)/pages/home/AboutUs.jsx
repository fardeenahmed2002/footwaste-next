"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import Header from "../../components/Header.jsx";

const AboutUs = () => {
  const { inEng } = useContext(Context)
  return (
    <div className="relative bg-[url('/aboutusbg.jpg')] bg-cover bg-center bg-no-repeat border-x-[10px] border-[#2171b5] py-20 px-4">
      <div className="relative z-10 bg-black/30 backdrop-blur-md rounded-xl p-10 mx-auto shadow-2xl max-w-6xl">
        <Header title={inEng ? `About us` : `আমাদের সম্পর্কে`} />

        <div className="flex flex-col md:flex-row items-center gap-10">

          <div className="flex-1 text-center md:text-left">
            {inEng ? (<p className="text-base sm:text-lg text-[#FFF7E6] text-left sm:text-justify px-2 sm:px-0 md:pl-10">
              We are a mission-driven organization focused on reducing food waste and combating hunger.
              Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
              Join us in our journey to make a positive impact on the world, one meal at a time.
            </p>) : (<p className="text-base sm:text-lg text-[#FFF7E6] text-left sm:text-justify px-2 sm:px-0 md:pl-10">
              আমরা একটি লক্ষ্যভিত্তিক প্রতিষ্ঠান, যার মূল উদ্দেশ্য খাদ্য অপচয় কমানো এবং ক্ষুধার বিরুদ্ধে লড়াই করা।
              আমাদের লক্ষ্য হলো অতিরিক্ত খাদ্য সংগ্রহ করা, তা প্রয়োজনীয় মানুষদের মাঝে পুনর্বিতরণ করা এবং একটি আরও টেকসই ভবিষ্যৎ গড়ে তোলা।
              আসুন, আমরা সবাই একসাথে এগিয়ে যাই—একবারে একটি খাবারের মাধ্যমে পৃথিবীতে ইতিবাচক পরিবর্তন আনতে।
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


          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 flex justify-center px-2 sm:px-0"
          >
            <img
              src="/aboutus.png"
              alt="About Us"
              className="w-full max-w-[300px] sm:max-w-full rounded-lg sm:ml-[80px] sm:mb-[-40px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
