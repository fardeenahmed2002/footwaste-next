"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../../components/Header.jsx"
import "./style.css"

const tipsData = [
  { id: 1, img: "/1.jpeg", title: "Plan Your Meals", desc: "Avoid overbuying and ensure you use everything in your pantry by planning meals ahead." },
  { id: 2, img: "/2.jpeg", title: "Store Food Properly", desc: "Proper storage can extend the shelf life of fresh foods and reduce spoilage." },
  { id: 3, img: "/3.jpeg", title: "Use Leftovers Creatively", desc: "Transform leftover meals into new dishes to minimize waste and save money." },
  { id: 4, img: "/4.jpeg", title: "Compost Scraps", desc: "Turn food scraps into nutrient-rich compost to reduce landfill waste and nourish your garden." },
  { id: 5, img: "/5.jpeg", title: "Serve Correct Portions", desc: "Serving smaller portions helps avoid food leftovers. You can always go back for seconds!" },
  { id: 6, img: "/6.jpeg", title: "Understand Expiration Dates", desc: "Use “Best Before” and “Use By” dates as a guide to avoid throwing away food too early." },
  { id: 7, img: "/7.jpeg", title: "Buy in Bulk", desc: "Purchase larger quantities of non-perishable items to reduce packaging waste and save money." },
  { id: 8, img: "/8.jpeg", title: "Donate Extra Food", desc: "If you have extra food you can’t use, donate it to local food banks or shelters." },
  { id: 9, img: "/9.jpeg", title: "Freeze Food", desc: "Freeze surplus food to preserve it for later use, helping to avoid waste." },
  { id: 10, img: "/10.jpeg", title: "Make Leftover Soups", desc: "Repurpose leftover vegetables, meats, and grains to make hearty soups and stews." },
]

const Tips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tipsData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentTip = tipsData[currentTipIndex]

  return (
    <div className="relative bg-[url('/tipsbg.jpg')] bg-cover border-x-[10px] border-[#2171b5] min-h-screen pb-10 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />
      <div className="relative z-10">
        <Header>Food Waste Reduction Tips</Header>

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
              <div className="flex flex-col text-[#FFF7E6] w-full sm:w-[420px]">
                <motion.h3
                  className="text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentTip.title}
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-center sm:text-left"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {currentTip.desc}
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
