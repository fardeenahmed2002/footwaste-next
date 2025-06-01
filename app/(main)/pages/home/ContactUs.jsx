"use client"
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '../../components/Header.jsx'
import { Phone, Mail, MapPin } from 'lucide-react'
export default function ContactUs() {
  const [place, setPlace] = useState('Uttara')
  const [input, setInput] = useState('')
  const handleSearch = () => {
    if (input.trim() !== '') {
      setPlace(input.trim())
    }
  }
  return (
    <motion.div
      whileInView={{ y: [200, 0] }}
      transition={{ delay: 0.25, duration: 1 }}
      className="relative border-x-[10px] border-[#FFF7E6] py-16 px-4 overflow-hidden bg-[url('/contactusbg.jpg')] bg-cover"
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />
      
      <div className="relative z-10 p-8 rounded-lg text-white w-[95%] ml-[35px]">
        <Header children="Contact Us" />
        <p className="mt-4 max-w-4xl text-lg leading-relaxed">
          Whether you're interested in volunteering, donating, or just want to say hello — we’d love to hear from you. Our team is dedicated to building a stronger, more sustainable community by reducing food waste and fighting hunger. Reach out anytime!
        </p>
        <div className="mt-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6 bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/20 text-black">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <p className="text-lg font-semibold">Phone</p>
                <p className="text-base">+880 1234 567890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <p className="text-lg font-semibold">Email</p>
                <p className="text-base">contact@foodrescue.org</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-yellow-300 mt-1" />
              <div>
                <p className="text-lg font-semibold">Address</p>
                <p className="text-base">House #12, Road #3, Sector #4, Uttara, Dhaka, Bangladesh</p>
              </div>
            </div>
            <motion.button
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/contact">Get in Touch</Link>
            </motion.button>
          </div>
          <div className="flex-1 space-y-4 bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/20 text-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search location..."
                className="w-full px-4 py-2 rounded-lg border border-black outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                Search
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/30">
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
