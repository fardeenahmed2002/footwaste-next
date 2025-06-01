'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Parkinsans } from 'next/font/google'
const parkinsans = Parkinsans(
  {
    subsets: ['latin'],
    weight: ['400'],
  }
)
export default function Hero() {
  const router = useRouter()
  const register = () => {
    router.push('/signup')
  }
  return (
    <section className="relative bg-[#FFF7E6] bg-[url('/hero.jpg')] bg-cover px-8 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />
      <div className="pt-[60px] relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="max-w-xl text-center md:text-left "
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}>
          <p className="text-[#FFF7E6] italic text-lg mb-2">100% Organic Foods</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            <span className="text-[#FFF7E6]">Reuse </span>
            <span className="text-[#FFF7E6]">Revive </span>
            <span className="text-green-700">Rescue</span>
          </h1>
          <p className={`mt-4 text-[#FFF7E6] text-justify ${parkinsans.className}`}>
            Every year, tons of perfectly good food go to waste while millions go hungry.
            We're here to change that. Join us in reducing food waste.
            Together, we can bridge the gap between surplus and scarcity.
            Your small act can make a big difference — not just in saving food, but in saving lives.
            Be a part of a movement that nourishes people, protects the planet, and builds a more compassionate world.
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
          className="mb-10 md:mb-0 md:ml-10"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img
            src="/veggies.png"
            alt="Organic Vegetables"
            className="w-full max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  )
}
