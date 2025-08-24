"use client";
import { Context } from '@/app/contextapi/ContextProvider.jsx';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import Header from "../../components/Header.jsx";
export default function Steps() {
  const { inEng } = useContext(Context)
  const steps = [
    {
      title: 'Rescue',
      titleInBng: 'উদ্ধার',
      img: '/Rescue.png',
      text: `Rescue is the first critical step in reducing food waste. By identifying surplus food before it is discarded, we prevent perfectly edible food from ending up in landfills. This includes partnering with stores, restaurants, and individuals to collect safe, fresh food.`,
      textInBng: `উদ্ধার হলো খাদ্য অপচয় কমানোর প্রথম গুরুত্বপূর্ণ ধাপ। অতিরিক্ত খাবার ফেলে দেওয়ার আগে শনাক্ত করার মাধ্যমে, আমরা পুরোপুরি খাওয়ার যোগ্য খাবারকে ল্যান্ডফিলে শেষ হতে দিতে পারি না। এর মধ্যে দোকান, রেস্তোরাঁ এবং ব্যক্তিদের সাথে অংশীদারিত্ব করে নিরাপদ ও তাজা খাবার সংগ্রহ করা অন্তর্ভুক্ত।`,
      delay: 0.25,
    },
    {
      title: 'Redistribute',
      titleInBng: 'পুনর্বিতরণ',
      img: '/Redistribute.png',
      text: `Redistribution makes rescued food available to those in need. We deliver this food to charities, shelters, and food banks, addressing hunger and supporting communities while minimizing food waste.`,
      textInBng: `পুনর্বিতরণ উদ্ধার করা খাবারকে প্রয়োজনীয় মানুষের কাছে পৌঁছে দেয়। আমরা এই খাবারগুলো চ্যারিটি, শেল্টার এবং ফুড ব্যাংকে পৌঁছে দিই, ক্ষুধা দূর করি এবং কমিউনিটিকে সমর্থন করি, পাশাপাশি খাদ্য অপচয়ও কমাই।`,
      delay: 0.5,
    },
    {
      title: 'Reduce',
      titleInBng: 'হ্রাস',
      img: '/Reduce.png',
      text: `Reducing waste starts with small daily habits—proper storage, planning meals, and using leftovers. Encouraging these practices helps build a sustainable lifestyle that protects our resources and planet.`,
      textInBng: `খাদ্য অপচয় কমানো শুরু হয় দৈনন্দিন ছোট ছোট অভ্যাস থেকে—সঠিকভাবে সংরক্ষণ, খাবার পরিকল্পনা করা এবং অবশিষ্ট ব্যবহার করা। এই অভ্যাসগুলো উৎসাহিত করলে একটি টেকসই জীবনধারা গড়ে ওঠে যা আমাদের সম্পদ ও পৃথিবীকে রক্ষা করে।`,
      delay: 0.75,
    },
  ];

  return (
    <div className="relative border-x-[10px] border-[#1C2532] py-16 px-4 overflow-hidden bg-[url('/stepsbg.jpg')] bg-cover">
      <div className="absolute inset-0 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Header title={inEng ? `Our Approach to Tackling Food Waste` : `খাদ্য অপচয় প্রতিরোধে আমাদের দৃষ্টিভঙ্গি`} />
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative bg-[#1C2532] w-[350px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#FFC808] transition-all"
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
                <h2 className="text-xl font-bold text-white mb-3">{inEng ? step.title : step.titleInBng}</h2>
                <p className="text-white text-justify text-sm">{inEng ? step.text : step.textInBng}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
