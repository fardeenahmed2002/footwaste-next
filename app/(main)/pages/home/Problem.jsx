"use client";
import Header from "../../components/Header.jsx";
import { motion } from "framer-motion";

const Problem = () => {
  const cards = [
    {
      title: "Economic Cost",
      text: "According to a 2023 report, between 12% and 32% of staple foods are lost during production and distribution in Bangladesh, leading to substantial economic losses.",
      image: "money.png",
      link: "https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh",
      delay: .5,
    },
    {
      title: "Eco Damage",
      text: "In 2023, Bangladesh's waste-related methane emissions were equivalent to over 15 million metric tons of CO₂, contributing significantly to climate change.",
      image: "earth.png",
      link: "https://www.statista.com/statistics/1418133/waste-related-methane-emissions-from-bangladesh/",
      delay: 1,
    },
    {
      title: "Hunger Issue",
      text: "Despite significant food waste, approximately 24% of Bangladesh's population still lives under the poverty line, and millions face food insecurity and malnutrition.",
      image: "hunger.png",
      link: "https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh",
      delay: 1.5,
    },
  ];

  return (
    <div className="relative bg-[url('/reducefoodwastebg.jpg')] bg-cover border-x-[10px] border-[#2171b5] border-t-[10px]  min-h-screen pb-10">

      <div className="absolute inset-0 backdrop-blur-sm z-0" />


      <div className="relative z-10">
        <Header children='Why Reduce Food Waste?' />
        <div className="flex flex-wrap justify-center gap-8 mt-6 px-4">
          {cards.map((card, index) => (
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
                  <h1 className="text-3xl font-bold mb-2 text-center">{card.title}</h1>
                  <p className="text-[black] text-[15px] leading-relaxed text-center flex-grow">
                    {card.text}
                  </p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 self-center font-semibold text-sm bg-[#2171b5] text-white py-2 px-5 rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out"
                  >
                    View Details
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
