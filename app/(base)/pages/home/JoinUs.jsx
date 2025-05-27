"use client"
import Link from 'next/link'
import Header from '../../components/Header.jsx'
import { motion } from 'framer-motion'
import { Sprout, Utensils, Handshake, Heart, Globe2 } from 'lucide-react'

export default function JoinUs() {
  return (
    <div
      className="relative border-x-[20px] mt-[-25px] border-[#15803D] border-double font-robotoCondensed"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/joinus.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black opacity-20" />
      <div className="relative w-[95%] ml-[35px] p-8 md:p-12 text-white rounded-lg">
        <Header childern="Be Part of the Change" />
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <div className="text-center md:text-left w-full max-w-xl mx-auto md:mx-0">
            <p className="mt-4 text-justify text-lg md:text-xl leading-relaxed bg-black bg-opacity-20 rounded-lg p-6 tracking-wide shadow-lg text-white">
              Together, we can turn{' '}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Sprout className="w-5 h-5 text-green-400" aria-hidden="true" />
                <span>surplus food into hope</span>
              </span>
              , and by joining our mission, you help{' '}
              <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                <Utensils className="w-5 h-5" aria-hidden="true" />
                <span>fight hunger</span>
              </span>
              , reduce waste, and build stronger communities{' '}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Handshake className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              </span>
              . Every contribution matters, no matter how small. When we share resources wisely, we create a future where no one goes hungry. Your involvement supports local farmers, reduces carbon footprints, and inspires hope across generations. Be the change that{' '}
              <span className="font-semibold inline-flex items-center space-x-1">
                <Heart className="w-5 h-5 text-red-400" aria-hidden="true" />
                <span>nourishes lives</span>
              </span>{' '}
              and{' '}
              <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                <Globe2 className="w-5 h-5" aria-hidden="true" />
                <span>protects our planet</span>
              </span>
              . Join us today and help build a kinder, greener world.
            </p>

            <Link href="/signup" passHref>
              <button
                aria-label="Join us signup page"
                className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
              >
                Join Us
              </button>
            </Link>
          </div>

          <motion.div
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
          </motion.div>
        </div>
      </div>
    </div>
  )
}
