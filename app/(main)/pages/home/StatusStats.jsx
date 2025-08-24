"use client"

import { Context } from '@/app/contextapi/ContextProvider.jsx'
import { Handshake, Users, UtensilsCrossed } from 'lucide-react'
import { useContext } from 'react'
import Header from "../../components/Header.jsx"
import CountUp from "react-countup"
import { motion } from "framer-motion"

function StatCard({ icon: Icon, title, number, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-gradient-to-br from-[#1c2333] to-[#2a324a] 
      border border-white/10 p-8 rounded-2xl shadow-xl 
      flex flex-col items-center justify-center text-white 
      hover:scale-105 transition-transform duration-300"
    >
      <Icon className="text-green-400 w-12 h-12 mb-4" />
      <h3 className="text-3xl font-extrabold">
        <CountUp 
          end={number} 
          duration={2.5} 
          separator="," 
          enableScrollSpy 
          scrollSpyOnce
        />
      </h3>
      <p className="text-gray-300 mt-2 text-base text-center font-medium">
        {title}
      </p>
    </motion.div>
  )
}

export default function StatusStats() {
  const { inEng } = useContext(Context)

  return (
    <section className="relative border-x-[10px] border-[#1C2532] py-20 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <Header title={inEng ? `Our Impact in Numbers` : `সংখ্যায় আমাদের প্রভাব`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <StatCard icon={Users} title={inEng ? "Total Collectors" : "মোট সংগ্রাহক"} number={127} delay={0.2} />
          <StatCard icon={UtensilsCrossed} title={inEng ? "Total Food Donated" : "মোট খাদ্য দান"} number={10435} delay={0.4} />
          <StatCard icon={Handshake} title={inEng ? "Total People Donated" : "মোট দাতা"} number={837} delay={0.6} />
        </div>
      </div>
    </section>
  )
}
