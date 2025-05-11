"use client"
import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is food rescue?",
            answer: "Food rescue is the process of rescuing surplus food from waste and redirecting it to those in need. This helps reduce food waste and alleviates hunger in communities."
        },
        {
            question: "How can I donate food?",
            answer: "You can donate food by contacting us directly through our website or visiting our nearest donation center. We'll ensure the food goes to those who need it most."
        },
        {
            question: "How do I become a volunteer?",
            answer: "Becoming a volunteer is easy! Simply fill out our volunteer application form on our website, and we'll guide you through the next steps."
        },
        {
            question: "Can I partner with you?",
            answer: "Yes! We welcome partnerships with businesses, organizations, and local communities. To become a partner, get in touch with us through our 'Partner With Us' page."
        },
        {
            question: "What happens to the food after it is rescued?",
            answer: "The rescued food is distributed to local food banks, shelters, and community centers. We work with these organizations to ensure the food reaches individuals and families who need it."
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 px-6 bg-gray-50 border-x-[20px] border-[#3B42D2] mt-[-25px] border-double">
            <div className="max-w-4xl mx-auto text-center">
                <Header childern={`Frequently Asked Questions`}/>
                <div className="mt-8 space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item bg-white p-6 rounded-lg shadow-md">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="text-left w-full text-xl font-semibold text-gray-800 flex justify-between items-center"
                            >
                                {faq.question}
                                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                    &#9660;
                                </span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-4 text-gray-700">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 bg-green-600 text-white p-8 rounded-lg">
                    <h3 className="text-2xl font-bold">Have Further Questions?</h3>
                    <p className="mt-4 text-lg">If you have any other questions or need more information, feel free to reach out to us. We're here to help!</p>
                    <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-all">
                        <Link href='/contact'> Contact Us</Link>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FAQ
