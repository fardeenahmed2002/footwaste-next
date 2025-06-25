"use client";
import Link from "next/link";
import Header from "../../components/Header.jsx";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="relative bg-[url('/aboutusbg.jpg')] bg-cover bg-center bg-no-repeat border-x-[10px] border-[#2171b5] py-20 px-4">
      <div className="relative z-10 bg-black/30 backdrop-blur-md rounded-xl p-10 mx-auto shadow-2xl max-w-6xl">
        <Header children="About Us" />

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-base sm:text-lg text-[#FFF7E6] text-left sm:text-justify px-2 sm:px-0 md:pl-10">
              We are a mission-driven organization focused on reducing food waste and combating hunger.
              Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
              Join us in our journey to make a positive impact on the world, one meal at a time.
            </p>

            <div className="mt-8 px-2 sm:px-0 md:pl-10 text-center md:text-left">
              <Link href="/pages/about">
                <button className="bg-[#2171b5] hover:bg-[#6baed6] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
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
