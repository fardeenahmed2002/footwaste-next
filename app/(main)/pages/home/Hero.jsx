'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Parkinsans } from 'next/font/google'

const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Hero() {
  const router = useRouter()
  const register = () => {
    router.push('/signup')
  }

  return (
    <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center px-4 sm:px-6 py-12 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm z-0" />
      <div className="pt-12 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-white italic text-base sm:text-lg">100% Organic Foods</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mt-2">
            <span className="text-[#FFF7E6]">Reuse </span>
            <span className="text-[#FFF7E6]">Revive </span>
            <span className="text-[#2171b5]">Rescue</span>
          </h1>
          <p className={`mt-4 text-white text-sm sm:text-base text-justify ${parkinsans.className}`}>
            Every year, tons of perfectly good food go to waste while millions go hungry.
            We're here to change that. Join us in reducing food waste.
            Together, we can bridge the gap between surplus and scarcity.
            Your small act can make a big difference — not just in saving food, but in saving lives.
            Be a part of a movement that nourishes people, protects the planet, and builds a more compassionate world.
          </p>
          <motion.button
            className="mt-6 bg-[#2171b5] hover:bg-[#6baed6] text-black font-semibold px-5 py-2 rounded-full transition-all duration-300 text-sm sm:text-base"
            onClick={register}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Join us →
          </motion.button>
        </motion.div>

        <motion.div
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
        </motion.div>
      </div>
    </section>
  )
}
