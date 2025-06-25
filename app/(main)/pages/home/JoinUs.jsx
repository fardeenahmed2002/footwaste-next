"use client";
import Link from "next/link";
import Header from "../../components/Header.jsx";
import { motion } from "framer-motion";
import { Sprout, Utensils, Handshake, Heart, Globe2 } from "lucide-react";

export default function JoinUs() {
  return (
    <div className="relative bg-[url('/joinusbg.jpg')] bg-cover border-x-[10px] border-[#2171b5]">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 text-white rounded-lg">
        <Header>Be Part of the Change</Header>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-10">
          {/* Text Section */}
          <div className="text-center md:text-left w-full max-w-xl mx-auto md:mx-0">
            <p className="mt-4 text-left sm:text-justify text-base sm:text-lg md:text-xl leading-relaxed bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
              Together, we can turn{" "}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Sprout className="w-5 h-5 text-green-400" />
                <span>surplus food into hope</span>
              </span>
              , and by joining our mission, you help{" "}
              <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                <Utensils className="w-5 h-5" />
                <span>fight hunger</span>
              </span>
              , reduce waste, and build stronger communities{" "}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Handshake className="w-5 h-5 text-cyan-400" />
              </span>
              . Every contribution matters, no matter how small. When we share
              resources wisely, we create a future where no one goes hungry.
              Your involvement supports local farmers, reduces carbon
              footprints, and inspires hope across generations. Be the change
              that{" "}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-400" />
                <span>nourishes lives</span>
              </span>{" "}
              and{" "}
              <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                <Globe2 className="w-5 h-5" />
                <span>protects our planet</span>
              </span>
              . Join us today and help build a kinder, greener world.
            </p>

            <Link href="/signup" passHref>
              <button
                aria-label="Join us signup page"
                className="mt-8 bg-[#2171b5] hover:bg-[#6baed6] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
              >
                Join Us
              </button>
            </Link>
          </div>

          {/* Optional image section */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block"
          >
            {/* Reserved for future image or illustration */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
