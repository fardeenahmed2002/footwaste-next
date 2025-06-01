"use client"
import { Users, Handshake, UtensilsCrossed } from 'lucide-react'
import Header from "../../components/Header.jsx"

function StatCard({ icon: Icon, title, number }) {
  return (
    <div
      className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white"
    >
      <Icon className="text-green-400 w-10 h-10 mb-4" />
      <h3 className="text-4xl font-bold">{number}</h3>
      <p className="text-white/80 mt-2 text-center">{title}</p>
    </div>
  )
}

export default function StatusStats() {
  return (
    <section className="relative border-x-[10px] border-[#FFF7E6] py-16 px-4 overflow-hidden bg-[url('/statusbg.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />

      <div className="relative z-10">
        <Header children={'Our Impact in Numbers'} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
          <StatCard icon={Users} title="Total Collectors" number={127} />
          <StatCard icon={UtensilsCrossed} title="Total Food Donated" number={10435} />
          <StatCard icon={Handshake} title="Total People Donated" number={837} />
        </div>
      </div>
    </section>
  )
}
