"use client"
import Link from "next/link"
import Header from "../../components/Header.jsx"
import { motion } from 'framer-motion'
const AboutUs = () => {
  return (
    <div className="bg-[url('/abt.png')] bg-cover bg-center bg-no-repeat border-x-[20px] mt-[-25px] border-[#15803D] border-double py-20 px-4">
      <div className="backdrop-blur-sm rounded-xl p-10 mx-auto shadow-2xl max-w-6xl">
        <Header childern={`About us`} />
        <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg text-gray-800 text-justify pl-[90px]">
              We are a mission-driven organization focused on reducing food waste and combating hunger.
              Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
              Join us in our journey to make a positive impact on the world, one meal at a time.
            </p>
            <div className="mt-8">
              <Link href="/pages/about">
                <button className="ml-[90px] bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ y: -150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <img
              src="/aboutus.png"
              alt="About Us"
              className="w-full max-w-md mx-auto absolute top-[-135px] left-[105px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
