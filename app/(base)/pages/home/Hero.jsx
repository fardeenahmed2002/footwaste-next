"use client"

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Parkinsans } from 'next/font/google'

const parkinsans = Parkinsans({
  subsets: ['latin'],
})

export default function Hero() {
  const router = useRouter()

  const register = () => {
    router.push('/signup')
  }

  return (
    <section className="bg-[#fff7e6] px-8 py-12 md:flex items-center justify-between relative overflow-hidden">
      <motion.div
        className="max-w-xl z-10"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-green-700 italic text-lg mb-2">100% Organic Foods</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          <span className="text-black">Reuse </span>
          <span className="text-black">Revive </span>
          <span className="text-green-700">Rescue</span>
        </h1>
        <br />
        <p className={`text-black text-justify w-[325px] ${parkinsans.className}`}>
          Every year, tons of perfectly good food go to waste while millions go hungry. We're here to change that. Join us in reducing food waste.
        </p>
        <motion.button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
          onClick={register}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Join us →
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-10 md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img
          src="/veggies.png"
          alt="Organic Vegetables"
          className="w-full max-w-lg object-contain"
        />
      </motion.div>

      <div className="absolute inset-0 opacity-20 bg-[url('/background-veggie-pattern.png')] bg-repeat pointer-events-none hidden md:block" />
    </section>
  )
}
