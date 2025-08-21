"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import { motion } from "framer-motion";
import { useContext } from "react";
import Header from "../../components/Header.jsx";

const Problem = () => {
  const { inEng } = useContext(Context);
  const cards = [
    {
      title: "Economic Cost",
      titleInBng: "অর্থনৈতিক ক্ষতি",
      text: "According to a 2023 report, between 12% and 32% of staple foods are lost during production and distribution in Bangladesh, leading to substantial economic losses.",
      textInBng: "২০২৩ সালের এক রিপোর্ট অনুযায়ী, বাংলাদেশে উৎপাদন ও সরবরাহের সময় প্রায় ১২% থেকে ৩২% প্রধান খাদ্য নষ্ট হয়, যা ব্যাপক অর্থনৈতিক ক্ষতির কারণ।",
      image: "money.png",
      link: "https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh",
      delay: 0.5,
    },
    {
      title: "Eco Damage",
      titleInBng: "পরিবেশের ক্ষতি",
      text: "In 2023, Bangladesh's waste-related methane emissions were equivalent to over 15 million metric tons of CO₂, contributing significantly to climate change.",
      textInBng: "২০২৩ সালে, বাংলাদেশের বর্জ্যজনিত মিথেন নিঃসরণ ১ কোটি ৫০ লক্ষ মেট্রিক টন CO₂-এর সমতুল্য ছিল, যা জলবায়ু পরিবর্তনে উল্লেখযোগ্যভাবে ভূমিকা রেখেছে।",
      image: "earth.png",
      link: "https://www.statista.com/statistics/1418133/waste-related-methane-emissions-from-bangladesh/",
      delay: 1,
    },
    {
      title: "Hunger Issue",
      titleInBng: "ক্ষুধার সমস্যা",
      text: "Despite significant food waste, approximately 24% of Bangladesh's population still lives under the poverty line, and millions face food insecurity and malnutrition.",
      textInBng: "বিপুল খাদ্য অপচয়ের পরও, বাংলাদেশের প্রায় ২৪% মানুষ দারিদ্রসীমার নিচে বসবাস করে এবং লক্ষ লক্ষ মানুষ খাদ্য নিরাপত্তাহীনতা ও অপুষ্টিতে ভুগছে।",
      image: "hunger.png",
      link: "https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh",
      delay: 1.5,
    },
    {
      title: "Food Security",
      titleInBng: "খাদ্য নিরাপত্তা",
      text: "Reducing food waste ensures more food is available for people, especially in a country like Bangladesh where millions face food insecurity.",
      textInBng: "খাদ্য অপচয় কমালে আরও বেশি খাবার মানুষের জন্য ব্যবহার করা সম্ভব হয়, বিশেষ করে বাংলাদেশে যেখানে লাখো মানুষ খাদ্য নিরাপত্তাহীনতায় ভুগছে।",
      image: "food security.jpg",
      link: "https://www.fao.org/fao-stories/article/en/c/1309609/",
      delay: 0.5,
    },
    {
      title: "Environmental Protection",
      titleInBng: "পরিবেশ সুরক্ষা",
      text: "Food waste in landfills generates methane gas, a major driver of climate change. Cutting food waste directly helps reduce greenhouse.",
      textInBng: "ল্যান্ডফিলে জমা হওয়া খাদ্য অপচয় থেকে মিথেন গ্যাস তৈরি হয়, যা জলবায়ু পরিবর্তনের বড় কারণ। খাদ্য অপচয় কমালে সরাসরি গ্রিনহাউস গ্যাস কমানো সম্ভব।",
      image: "Environmental Protection.jpg",
      link: "https://www.unep.org/resources/food-waste-index-report-2024",
      delay: 0.5,
    },
    {
      title: "Moral Responsibility",
      titleInBng: "নৈতিক দায়িত্ব",
      text: "Wasting food while others remain hungry is ethically unacceptable. Saving food reflects compassion and social responsibility.",
      textInBng: "অন্যরা ক্ষুধার্ত থাকা অবস্থায় খাবার নষ্ট করা নৈতিকভাবে অগ্রহণযোগ্য। খাদ্য বাঁচানো মানে সহানুভূতি ও সামাজিক দায়িত্বশীলতার প্রকাশ।",
      image: "Moral Responsibility.png",
      link: "https://www.theguardian.com/environment/food-waste",
      delay: 0.5,
    },
  ];

  return (
    <div className="relative bg-[url('/reducefoodwastebg.jpg')] bg-cover border-x-[10px] border-[#2171b5] border-t-[10px] min-h-screen pb-10">
      <div className="absolute inset-0 backdrop-blur-sm z-0" />

      <div className="relative z-10">
        <Header
          title={
            inEng
              ? "Why Reduce Food Waste?"
              : "কেন খাদ্য অপচয় কমানো উচিত?"
          }
        />


        <div className="flex flex-wrap justify-center gap-8 mt-6 px-4">
          {cards.slice(0, 3).map((card, index) => (
            <motion.div
              key={index}
              className="relative w-[90vw] max-w-[350px] h-[460px] sm:h-[430px] rounded-xl shadow-xl p-4 sm:p-6 transition-transform transform hover:scale-[1.03] hover:shadow-2xl overflow-hidden bg-[#6baed6]/50 backdrop-blur-md">
            
              <div className="absolute inset-0 bg-[url('/background-veggie-pattern.png')] bg-repeat bg-cover bg-center opacity-[30%] pointer-events-none z-0" />
              <div className="relative z-10 flex flex-col items-center gap-6 h-full">
                <motion.img
                  transition={{ delay: card.delay, duration: 1 }}
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[160px] sm:h-40 rounded-xl shadow-inner object-cover"
                />
                <div className="flex flex-col text-[black] grow">
                  <h1 className="text-3xl font-bold mb-2 text-center">
                    {inEng ? card.title : card.titleInBng}
                  </h1>
                  <p className="text-[black] text-[15px] leading-relaxed text-center flex-grow">
                    {inEng ? card.text : card.textInBng}
                  </p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 self-center font-semibold text-sm bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] py-2 px-5 rounded-full transition duration-300 ease-in-out"
                  >
                    {inEng ? `View Details` : `বিস্তারিত জানুন`}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="flex flex-wrap justify-center gap-8 mt-6 px-4">
          {cards.slice(3, 6).map((card, index) => (
            <motion.div
              key={index}
              className="relative w-[90vw] max-w-[350px] h-[460px] sm:h-[430px] rounded-xl shadow-xl p-4 sm:p-6 transition-transform transform hover:scale-[1.03] hover:shadow-2xl overflow-hidden bg-[#6baed6]/50 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[url('/background-veggie-pattern.png')] bg-repeat bg-cover bg-center opacity-[30%] pointer-events-none z-0" />
              <div className="relative z-10 flex flex-col items-center gap-6 h-full">
                <motion.img
                  transition={{ delay: card.delay, duration: 1 }}
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[160px] sm:h-40 rounded-xl shadow-inner object-cover"
                />
                <div className="flex flex-col text-[black] grow">
                  <h1 className="text-3xl font-bold mb-2 text-center">
                    {inEng ? card.title : card.titleInBng}
                  </h1>
                  <p className="text-[black] text-[15px] leading-relaxed text-center flex-grow">
                    {inEng ? card.text : card.textInBng}
                  </p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 self-center font-semibold text-sm bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] py-2 px-5 rounded-full transition duration-300 ease-in-out"
                  >
                    {inEng ? `View Details` : `বিস্তারিত জানুন`}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problem;
