"use client"
import { motion } from 'framer-motion'
import { Parkinsans } from 'next/font/google'
const parkinsans = Parkinsans({
  subsets: ['latin'],
});

export default function Hero() {
  return (
    <div className="relative bg-cover bg-center h-[480px] w-full bg-[#334DDA]" >
      <div className="flex flex-row gap-[100px] p-[50px]">
        <div className="flex flex-row relative">
          <motion.img
            whileInView={{ y: [-100, 160], opacity: [0, 1] }}
            transition={{ delay: 0.15, duration: 1 }}
            src="/food1.jpeg"
            alt="Food 1"
            className='w-[70px] h-[70px] rounded-full glow-border' />
          <motion.img
            whileInView={{ y: [-100, 70], opacity: [0, 1] }}
            transition={{ delay: 0.30, duration: 1 }}
            src="/food2.jpeg"
            alt="Food 2"
            className='w-[70px] h-[70px] rounded-full glow-border' />
          <motion.img
            whileInView={{ y: [-100, -20], opacity: [0, 1] }}
            transition={{ delay: 0.40, duration: 1 }}
            src="/food3.jpeg"
            alt="Food 3"
            className='w-[70px] h-[70px] rounded-full glow-border' />
          <motion.img
            whileInView={{ y: [-100, 70], opacity: [0, 1] }}
            transition={{ delay: 0.35, duration: 1 }}
            src="/food4.jpeg"
            alt="Food 4"
            className='w-[70px] h-[70px] rounded-full glow-border' />
          <motion.img
            whileInView={{ y: [-100, 160], opacity: [0, 1] }}
            transition={{ delay: 0.25, duration: 1 }}
            src="/food5.jpeg"
            alt="Food 5"
            className='w-[70px] h-[70px] rounded-full glow-border' />
          <motion.img
            whileInView={{ y: [-100, 260], opacity: [0, 1] }}
            transition={{ delay: 0.05, duration: 1 }}
            src="/food6.jpeg"
            alt="Food 6"
            className='w-[70px] h-[70px] rounded-full absolute left-[70px] glow-border' />
          <motion.img
            whileInView={{ y: [-100, 260], opacity: [0, 1] }}
            transition={{ delay: 0.10, duration: 1 }}
            src="/food7.jpeg"
            alt="Food 7"
            className='w-[70px] h-[70px] rounded-full absolute left-[210px] glow-border' />
          <motion.img
            whileInView={{ y: [-100, 160], opacity: [0, 1] }}
            transition={{ delay: 0.20, duration: 1 }}
            src="/food8.jpeg"
            alt="Food 8"
            className='w-[70px] h-[70px] rounded-full absolute left-[140px] glow-border' />
          <motion.img
            whileInView={{ y: [-100, 350], opacity: [0, 1] }}
            transition={{ delay: 0.00, duration: 1 }}
            src="/food9.jpeg"
            alt="Food 9"
            className='w-[70px] h-[70px] rounded-full absolute left-[140px] glow-border' />
        </div>
        <div className="w-[630px] ml-[-50px]">
          <h1 className="text-5xl font-bold animate-heading">
            <motion.p
              whileInView={{ y: [-100, 0], opacity: [0, 1] }}
              transition={{ delay: 2, duration: 1 }}
              className="font-robotoCondensed text-6xl text-white">Reuse</motion.p>
            <motion.p
              whileInView={{ y: [-100, 0], opacity: [0, 1] }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-robotoCondensed text-6xl text-white">Revive</motion.p>
            <motion.p
              whileInView={{ y: [-100, 0], opacity: [0, 1] }}
              transition={{ delay: 1, duration: 1 }}
              className='font-robotoCondensed text-6xl text-white'>Rescue</motion.p>
          </h1>
          <br />
          <p className={`text-black text-justify w-[325px] ${parkinsans.className}`}>
            Every year, tons of perfectly good food go to waste while millions go hungry. We're here to change that. Join us in reducing food waste.
          </p>
          <br />
          <button

            className={`mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all`}
          >
            Join With Us
          </button>
        </div>
      </div>
      <motion.img
        whileInView={{ y: [-350, 0], opacity: [0, 1] }}
        transition={{ delay: 0.25, duration: 1 }}
        src="bg.png"
        alt=""
        className='absolute left-[738px] top-[72px]' />
    </div>
  )
}
