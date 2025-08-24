"use client"
import { Context } from "@/app/contextapi/ContextProvider.jsx"
import { AnimatePresence, motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header.jsx"
import "./style.css"

const tipsData = [
  {
    id: 1,
    img: "/1.jpeg",
    title: "Plan Your Meals",
    titleInBng: "আপনার খাবারের পরিকল্পনা করুন",
    desc: "Avoid overbuying and ensure you use everything in your pantry by planning meals ahead.",
    descInBng: "অতিরিক্ত কেনা এড়ান এবং খাবারের পরিকল্পনা করে আপনার প্যান্ট্রির সবকিছু ব্যবহার নিশ্চিত করুন।"
  },
  {
    id: 2,
    img: "/2.jpeg",
    title: "Store Food Properly",
    titleInBng: "খাবার সঠিকভাবে সংরক্ষণ করুন",
    desc: "Proper storage can extend the shelf life of fresh foods and reduce spoilage.",
    descInBng: "সঠিক সংরক্ষণ তাজা খাবারের আয়ুষ্কাল বাড়ায় এবং নষ্ট হওয়া কমায়।"
  },
  {
    id: 3,
    img: "/3.jpeg",
    title: "Use Leftovers Creatively",
    titleInBng: "অবশিষ্ট খাবার সৃজনশীলভাবে ব্যবহার করুন",
    desc: "Transform leftover meals into new dishes to minimize waste and save money.",
    descInBng: "অবশিষ্ট খাবারকে নতুন খাবারে রূপান্তর করুন যাতে অপচয় কমে এবং অর্থ সাশ্রয় হয়।"
  },
  {
    id: 4,
    img: "/4.jpeg",
    title: "Compost Scraps",
    titleInBng: "খাবারের বাকি অংশ কম্পোস্ট করুন",
    desc: "Turn food scraps into nutrient-rich compost to reduce landfill waste and nourish your garden.",
    descInBng: "খাবারের বাকি অংশকে পুষ্টিকর কম্পোস্টে রূপান্তর করুন, যাতে ল্যান্ডফিলের অপচয় কমে এবং আপনার বাগান পুষ্ট হয়।"
  },
  {
    id: 5,
    img: "/5.jpeg",
    title: "Serve Correct Portions",
    titleInBng: "সঠিক পরিমাণে পরিবেশন করুন",
    desc: "Serving smaller portions helps avoid food leftovers. You can always go back for seconds!",
    descInBng: "ছোট অংশে পরিবেশন করলে খাবার বাকি থাকে না। চাইলে পরে আরও নিতে পারেন।"
  },
  {
    id: 6,
    img: "/6.jpeg",
    title: "Understand Expiration Dates",
    titleInBng: "মেয়াদ শেষ হওয়ার তারিখ বুঝুন",
    desc: "Use “Best Before” and “Use By” dates as a guide to avoid throwing away food too early.",
    descInBng: "খাবার খুব আগে ফেলা এড়াতে “Best Before” এবং “Use By” তারিখ ব্যবহার করুন।"
  },
  {
    id: 7,
    img: "/7.jpeg",
    title: "Buy in Bulk",
    titleInBng: "বাল্কে কিনুন",
    desc: "Purchase larger quantities of non-perishable items to reduce packaging waste and save money.",
    descInBng: "অক্ষয়যোগ্য আইটেম বড় পরিমাণে কিনুন যাতে প্যাকেজিং অপচয় কমে এবং অর্থ সাশ্রয় হয়।"
  },
  {
    id: 8,
    img: "/8.jpeg",
    title: "Donate Extra Food",
    titleInBng: "অতিরিক্ত খাবার দান করুন",
    desc: "If you have extra food you can’t use, donate it to local food banks or shelters.",
    descInBng: "যদি অতিরিক্ত খাবার থাকে যা ব্যবহার করতে না পারেন, তা স্থানীয় ফুড ব্যাংক বা আশ্রয়কেন্দ্রে দান করুন।"
  },
  {
    id: 9,
    img: "/9.jpeg",
    title: "Freeze Food",
    titleInBng: "খাবার ফ্রিজ করুন",
    desc: "Freeze surplus food to preserve it for later use, helping to avoid waste.",
    descInBng: "অতিরিক্ত খাবার ফ্রিজে রাখুন যাতে পরে ব্যবহার করা যায় এবং অপচয় এড়ানো যায়।"
  },
  {
    id: 10,
    img: "/10.jpeg",
    title: "Make Leftover Soups",
    titleInBng: "অবশিষ্ট থেকে স্যুপ তৈরি করুন",
    desc: "Repurpose leftover vegetables, meats, and grains to make hearty soups and stews.",
    descInBng: "অবশিষ্ট সবজি, মাংস এবং শস্য ব্যবহার করে সুস্বাদু স্যুপ ও স্ট্যু তৈরি করুন।"
  },
];


const Tips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const { inEng } = useContext(Context)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tipsData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentTip = tipsData[currentTipIndex]

  return (
    <div className="relative border-x-[10px] border-[#1C2532] min-h-screen pb-10 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />
      <div className="relative z-10">
        <Header title={inEng ? "Food Waste Reduction Tips" : "খাদ্য অপচয় কমানোর পরামর্শ"}/>


        <div className="flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip.id}
              className="w-full max-w-[860px] bg-black/20 backdrop-blur-md rounded-xl shadow-2xl p-4 text-black flex flex-col sm:flex-row items-center gap-6 sm:gap-[100px] mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={currentTip.img}
                alt={currentTip.title}
                className="w-full sm:w-[400px] h-[240px] sm:h-[400px] object-cover rounded-lg"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <div className="flex flex-col text-[black] w-full sm:w-[420px]">
                <motion.h3
                  className="text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {inEng ? currentTip.title : currentTip.titleInBng}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-center sm:text-left"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {inEng ? currentTip.desc : currentTip.descInBng}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Tips
