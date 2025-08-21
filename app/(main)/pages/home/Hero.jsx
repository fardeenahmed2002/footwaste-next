'use client'
import { Context } from '@/app/contextapi/ContextProvider'
import { motion } from 'framer-motion'
import { Parkinsans } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Hero() {
  const router = useRouter()
  const { inEng } = useContext(Context)
  const register = () => {
    router.push('/signup')
  }

  return (
    <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center px-4 sm:px-6 py-12 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />
      <div className="pt-12 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="w-full md:w-full text-center md:text-left bg-[black]/50 p-[40px]"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-snug mt-2">
            <span className="text-[#FFF7E6]"> {inEng ? (`Reuse`) : (`পুনঃব্যবহার `)}</span>
            <span className="text-[#FFF7E6]"> {inEng ? (`Revive`) : (`পুনর্জাগরণ `)}</span>
            <span className="text-[#2171b5]"> {inEng ? (`Rescue`) : (`উদ্ধার`)}</span>
          </h1>
          
            <p className={`mt-4 text-white text-sm sm:text-base text-justify ${parkinsans.className}`}>
              {inEng ? (
                <>
                  Every year, tons of perfectly good food go to waste while millions go hungry.
                  We're here to change that. Join us in reducing food waste.
                  Together, we can bridge the gap between surplus and scarcity.
                  Your small act can make a big difference — not just in saving food, but in saving lives.
                  Be a part of a movement that nourishes people, protects the planet, and builds a more compassionate world.
                </>
              ) : (
                <>
                  প্রতিবছর অগণিত ভালো খাবার নষ্ট হয়ে যায়, অথচ কোটি কোটি মানুষ ক্ষুধার্ত থাকে।
                  আমরা সেটাই বদলাতে এসেছি। খাদ্য অপচয় কমাতে আমাদের সাথে যোগ দিন।
                  একসাথে আমরা উদ্বৃত্ত আর অভাবের মধ্যে সেতুবন্ধন করতে পারি।
                  আপনার ছোট্ট উদ্যোগ বিশাল পরিবর্তন আনতে পারে—শুধু খাবার বাঁচাতেই নয়, জীবন বাঁচাতেও।
                  যোগ দিন এমন এক আন্দোলনে যা মানুষকে পুষ্টি দেয়, পৃথিবীকে রক্ষা করে এবং একটি মানবিক বিশ্ব গড়ে তোলে।
                </>
              )}
            </p>
          

          <motion.button
            className="mt-6 ml-[480px] bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-5 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
            onClick={register}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {inEng ? "Join us" : "আমাদের সাথে যোগ দিন"}
          </motion.button>
        </motion.div>

        {/* <motion.div
          className="mb-8 md:mb-0 w-full md:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img
            src="/veggies.png"
            alt="Organic Vegetables"
            className="w-3/4 sm:w-2/3 md:w-full max-w-md object-contain"
          />
        </motion.div> */}
      </div>
    </section>
  )
}
