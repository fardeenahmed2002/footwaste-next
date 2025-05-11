"use client"
import { motion } from 'framer-motion'
import Header from "../../components/Header.jsx"
import Link from 'next/link'
const ContactUs = () => {
    return (
        <motion.div
            whileInView={{ y: [200, 0] }}
            transition={{ delay: 0.25, duration:1 }}
            className='border-x-[20px] mt-[-25px] border-[#3B42D2] border-double'>
            <div className="bg-blue-600 text-white p-8 text-center rounded-lg w-[80%] ml-[130px]">
                <Header childern={`Contact Us`} />
                <p className="mt-2">We’d love to hear from you! Reach out for any questions or support.</p>
                <motion.button
                    className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg">
                    <Link href='/contact'>Get in Touch </Link>
                </motion.button>
            </div> <br /> <br />
        </motion.div>
    )
}

export default ContactUs
