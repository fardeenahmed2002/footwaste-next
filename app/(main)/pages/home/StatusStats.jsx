"use client"
import { motion, useInView } from 'framer-motion'
import { Users, Handshake, UtensilsCrossed } from 'lucide-react'
import CountUp from 'react-countup'
import Header from "../../components/Header.jsx"
import { useRef, useState, useEffect } from 'react'

function StatCard({ icon: Icon, title, target, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (isInView) {
      setStart(true)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center"
    >
      <Icon className="text-green-600 w-10 h-10 mb-4" />
      <h3 className="text-4xl font-bold text-black">
        {start && <CountUp end={target} duration={2} />}
      </h3>
      <p className="text-gray-600 mt-2 text-center">{title}</p>
    </motion.div>
  )
}

export default function StatusStats() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10 text-center border-x-[20px] border-[#15803D] border-double">
      <Header childern={'Our Impact in Numbers'} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <StatCard icon={Users} title="Total Collectors" target={127} delay={0.1} />
        <StatCard icon={UtensilsCrossed} title="Total Food Donated" target={10435} delay={0.3} />
        <StatCard icon={Handshake} title="Total People Donated" target={837} delay={0.5} />
      </div>
    </section>
  )
}
