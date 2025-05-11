"use client"
import { motion } from 'framer-motion'
import Header from "../../components/Header.jsx"

const Steps = () => {
    return (
        <div className='border-x-[20px] mt-[-25px] border-[#3B42D2] border-double'>
           <Header childern={`Our Approach to Tackling Food Waste`}/>
            <div className='flex flex-wrap gap-[20px] justify-center items-center align-middle'>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <motion.figure
                        whileInView={{ y: [-100, 0], opacity: [0, 1] }}
                        transition={{ delay: 0.25, duration: 1.5 }}
                    >
                        <img
                            src="/Rescue.png"
                            alt="earth"
                            className='w-[380px] h-[200px]' />
                    </motion.figure>
                    <div className="card-body">
                        <h2 className="card-title">Rescue</h2>
                        <motion.p
                        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                        transition={{ delay: 0.25, duration: 1.5 }} 
                        className='text-justify'>Rescue is the first critical step in reducing food waste. By identifying surplus food before it has the chance to be discarded, we are able to prevent perfectly edible food from going to waste. This involves working with grocery stores, restaurants, and individuals to gather food that is still fresh and safe for consumption but would otherwise end up in landfills.</motion.p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <motion.figure
                    whileInView={{ y: [-100, 0], opacity: [0, 1] }}
                    transition={{ delay: 0.50, duration: 1.5 }}
                    >
                        <img
                            src="/Redistribute.png"
                            alt="money"
                            className='w-[380px] h-[200px]' />
                    </motion.figure>
                    <div className="card-body">
                        <h2 className="card-title">Redistribute</h2>
                        <motion.p 
                        whileInView={{ y: [100, 0], opacity: [0, 1] }}
                        transition={{ delay: 0.25, duration: 1.5 }} 
                        className='text-justify'>Redistribution is about making rescued food available to those who need it the most. Once food is rescued, it is shared with local charities, shelters, and food banks, ensuring that it reaches communities who are struggling with food insecurity. By redistributing surplus food, we not only address hunger but also create a sense of community and support.</motion.p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <motion.figure
                    whileInView={{ y: [-100, 0], opacity: [0, 1] }}
                    transition={{ delay: 0.75, duration: 1.5 }}
                    >
                        <img
                            src="/Reduce.png"
                            alt="hunger"
                            className='w-[380px] h-[200px]' />
                    </motion.figure>
                    <div className="card-body">
                        <h2 className="card-title">Reduce</h2>
                        <motion.p 
                        whileInView={{ x: [100, 0], opacity: [0, 1] }}
                        transition={{ delay: 0.25, duration: 1.5 }} 
                        className='text-justify'>Reducing food waste starts with small changes in our daily habits. By learning how to properly store food, plan meals, and use leftovers, we can significantly lower the amount of food that goes uneaten. Encouraging families, businesses, and individuals to adopt these waste-free practices is crucial for creating long-term change. </motion.p>
                    </div>
                </div>

            </div> <br /> <br />

        </div>
    )
}

export default Steps
