"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { Context } from "@/app/contextapi/ContextProvider";

const FAQ = () => {
    const { inEng } = useContext(Context);
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: inEng ? "What is food rescue?" : "খাবার উদ্ধার কি?",
            answer: inEng
                ? "Food rescue is the process of rescuing surplus food from waste and redirecting it to those in need. This helps reduce food waste and alleviates hunger in communities."
                : "খাবার উদ্ধার হলো বর্জ্য থেকে অতিরিক্ত খাবার সংগ্রহ করে সেই খাবারকে যারা প্রয়োজন তাদের কাছে পৌঁছে দেওয়ার প্রক্রিয়া। এটি খাবার অপচয় কমায় এবং সম্প্রদায়ে ক্ষুধা দূর করতে সাহায্য করে।"
        },
        {
            question: inEng ? "How can I donate food?" : "আমি কীভাবে খাবার দান করতে পারি?",
            answer: inEng
                ? "You can donate food by contacting us directly through our website or visiting our nearest donation center. We'll ensure the food goes to those who need it most."
                : "আপনি আমাদের ওয়েবসাইটের মাধ্যমে সরাসরি যোগাযোগ করে বা নিকটতম ডোনেশন সেন্টারে গিয়ে খাবার দান করতে পারেন। আমরা নিশ্চিত করব খাবার সবচেয়ে প্রয়োজনীয়দের কাছে পৌঁছায়।"
        },
        {
            question: inEng ? "How do I become a volunteer?" : "আমি কীভাবে স্বেচ্ছাসেবক হতে পারি?",
            answer: inEng
                ? "Becoming a volunteer is easy! Simply fill out our volunteer application form on our website, and we'll guide you through the next steps."
                : "স্বেচ্ছাসেবক হওয়া সহজ! আমাদের ওয়েবসাইটে স্বেচ্ছাসেবক আবেদন ফর্ম পূরণ করুন, এবং আমরা আপনাকে পরবর্তী ধাপগুলোতে নির্দেশনা দেব।"
        },
        {
            question: inEng ? "Can I partner with you?" : "আমি কি আপনার সাথে অংশীদার হতে পারি?",
            answer: inEng
                ? "Yes! We welcome partnerships with businesses, organizations, and local communities. To become a partner, get in touch with us through our 'Partner With Us' page."
                : "হ্যাঁ! আমরা ব্যবসা, সংস্থা, এবং স্থানীয় কমিউনিটির সঙ্গে অংশীদারিত্বকে স্বাগত জানাই। অংশীদার হতে আমাদের 'Partner With Us' পেজের মাধ্যমে যোগাযোগ করুন।"
        },
        {
            question: inEng ? "What happens to the food after it is rescued?" : "খাবার উদ্ধার হওয়ার পর কী হয়?",
            answer: inEng
                ? "The rescued food is distributed to local food banks, shelters, and community centers. We work with these organizations to ensure the food reaches individuals and families who need it."
                : "উদ্ধারকৃত খাবার স্থানীয় ফুড ব্যাংক, আশ্রয়কেন্দ্র এবং কমিউনিটি সেন্টারে বিতরণ করা হয়। আমরা এই সংস্থাগুলোর সঙ্গে কাজ করি যাতে খাবার প্রয়োজনীয় ব্যক্তির এবং পরিবারের কাছে পৌঁছায়।"
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 px-6 bg-gray-50 border-x-[10px] border-[#1C2532] mt-[-25px]">
            <div className="max-w-4xl mx-auto text-center">
                <Header title={inEng ? "Frequently Asked Questions" : "প্রায়শই জিজ্ঞাসিত প্রশ্ন"} />

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

                <div className="mt-12 bg-[#1C2532] text-white p-8 rounded-lg">
                    <h3 className="text-2xl font-bold">
                        {inEng ? "Have Further Questions?" : "আরও প্রশ্ন আছে?"}
                    </h3>
                    <p className="mt-4 text-lg">
                        {inEng
                            ? "If you have any other questions or need more information, feel free to reach out to us. We're here to help!"
                            : "যদি আপনার আরও কোনো প্রশ্ন থাকে বা আরও তথ্য প্রয়োজন হয়, আমাদের সাথে যোগাযোগ করুন। আমরা সাহায্য করতে প্রস্তুত।"}
                    </p>
                    <button className="mt-6 bg-[#FFC808] border-1 hover:border-[#1C2532] text-black hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-6 py-2 rounded-lg transition-all">
                        <Link href='/pages/contactus'>
                            {inEng ? "Contact Us" : "যোগাযোগ করুন"}
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
