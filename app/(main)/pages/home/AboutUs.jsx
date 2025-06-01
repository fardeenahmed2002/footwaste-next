"use client";
import Link from "next/link";
import Header from "../../components/Header.jsx";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="relative bg-[url('/aboutushomebg.jpg')] bg-cover bg-center bg-no-repeat border-x-[10px] border-[#FFF7E6] py-20 px-4">
      
   
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-10 mx-auto shadow-2xl max-w-6xl">
        <Header children="About Us"/>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg text-[#FFF7E6] text-justify md:pl-10">
              We are a mission-driven organization focused on reducing food waste and combating hunger.
              Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
              Join us in our journey to make a positive impact on the world, one meal at a time.
            </p>
            <div className="mt-8 md:pl-10">
              <Link href="/pages/about">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 flex justify-center"
          >
            <img
              src="/aboutus.png"
              alt="About Us"
              className="w-full rounded-lg ml-[80px] mb-[-40px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
