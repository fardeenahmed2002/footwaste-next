"use client"
import Header from "../../components/Header.jsx"
import { motion } from 'framer-motion';
const Problem = () => {
    const cards = [
        {
            title: 'Economic Cost',
            text: 'According to a 2023 report, between 12% and 32% of staple foods are lost during production and distribution in Bangladesh, leading to substantial economic losses.',
            image: 'money.png',
            link: 'https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh',
            bgColor: 'from-green-700 to-green-600',
            delay: 1,
        },
        {
            title: 'Environmental Impact',
            text: "In 2023, Bangladesh's waste-related methane emissions were equivalent to over 15 million metric tons of CO₂, contributing significantly to climate change.",
            image: 'earth.png',
            link: 'https://www.statista.com/statistics/1418133/waste-related-methane-emissions-from-bangladesh/',
            bgColor: 'from-green-600 to-green-500',
            delay: 2,
        },
        {
            title: 'Hunger Issue',
            text: "Despite significant food waste, approximately 24% of Bangladesh's population still lives under the poverty line, and millions face food insecurity and malnutrition.",
            image: 'hunger.png',
            link: 'https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh',
            bgColor: 'from-green-500 to-green-400',
            delay: 2.2,
        },
    ]
    return (
        <div className='border-x-[20px] border-t-[20px] border-[#3B42D2] border-double min-h-screen bg-gradient-to-b from-white to-gray-100 pb-10'>
            <Header childern={`Why Reduce Food Waste?`} />
            <div className='flex flex-col items-center gap-10 mt-6'>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className={`w-[85%] md:w-[70%] rounded-xl shadow-lg bg-gradient-to-r ${card.bgColor} p-5 transition-transform transform hover:scale-[1.02] hover:shadow-2xl`}
                    >
                        <div className='flex flex-col md:flex-row items-center justify-center gap-[30px]'>
                            <motion.img
                                whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                                transition={{ delay: card.delay, duration: 1 }}
                                src={card.image}
                                alt={card.title}
                                className='w-[160px] h-[140px] rounded-xl shadow-inner glow-border'
                            />
                            <motion.div
                                whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                                transition={{ delay: card.delay + 0.1, duration: 1 }}
                                className='flex flex-col text-white max-w-[600px]'
                            >
                                <h1 className='text-3xl font-bold mb-2'>{card.title}</h1>
                                <p className='text-white text-[15px] leading-relaxed'>{card.text}</p>
                                <a
                                    href={card.link}
                                    target='_blank'
                                    className='mt-4 self-start text-center font-semibold text-sm bg-black py-1 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out'
                                >
                                    View Details
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Problem
