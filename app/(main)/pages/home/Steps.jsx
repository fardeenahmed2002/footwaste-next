"use client";
import { motion } from 'framer-motion';
import Header from "../../components/Header.jsx";
export default function Steps() {
  const steps = [
    {
      title: 'Rescue',
      img: '/Rescue.png',
      text: `Rescue is the first critical step in reducing food waste. By identifying surplus food before it is discarded, we prevent perfectly edible food from ending up in landfills. This includes partnering with stores, restaurants, and individuals to collect safe, fresh food.`,
      delay: 0.25,
    },
    {
      title: 'Redistribute',
      img: '/Redistribute.png',
      text: `Redistribution makes rescued food available to those in need. We deliver this food to charities, shelters, and food banks, addressing hunger and supporting communities while minimizing food waste.`,
      delay: 0.5,
    },
    {
      title: 'Reduce',
      img: '/Reduce.png',
      text: `Reducing waste starts with small daily habits—proper storage, planning meals, and using leftovers. Encouraging these practices helps build a sustainable lifestyle that protects our resources and planet.`,
      delay: 0.75,
    },
  ];
  return (
    <div className="relative border-x-[10px] border-[#FFF7E6] py-16 px-4 overflow-hidden bg-[url('/stepsbg.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />
      <div className="relative z-10"> 
        <Header children={`Our Approach to Tackling Food Waste`} />
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-md w-[350px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-400 transition-all"
              whileInView={{ opacity: [0, 1], y: [-50, 0] }}
              transition={{ delay: step.delay, duration: 1 }}
            >
              <motion.img
                src={step.img}
                alt={step.title}
                className="w-full h-[200px] object-cover"
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: step.delay, duration: 1 }}
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-green-800 mb-3">{step.title}</h2>
                <p className="text-gray-700 text-justify text-sm">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
