"use client";
import { useContext } from "react";
import { HandHeart, Users, Megaphone, DollarSign, Handshake, HeartHandshake } from 'lucide-react';
import Header from '../../components/Header';
import { Context } from "@/app/contextapi/ContextProvider";

const HowYouCanHelp = () => {
    const { inEng } = useContext(Context);

    const helpOptions = [
        {
            Icon: HandHeart,
            title: inEng ? "Donate Food" : "খাবার দান করুন",
            text: inEng
                ? "If you have surplus food, donate it to help feed those in need. Your donations can provide meals to hungry families, reduce food waste, and support your local community."
                : "যদি আপনার কাছে অতিরিক্ত খাবার থাকে, তবে তা দান করুন দরিদ্রদের খাওয়ানোর জন্য। আপনার দান ক্ষুধার্ত পরিবারদের খাবার দিতে সাহায্য করবে, খাবার নষ্ট কমাবে, এবং স্থানীয় কমিউনিটিকে সহায়তা করবে।"
        },
        {
            Icon: Users,
            title: inEng ? "Volunteer" : "স্বেচ্ছাসেবক হোন",
            text: inEng
                ? "Volunteers are the heart of our organization. By volunteering your time, you’ll be directly involved in rescuing food, distributing meals, and supporting our mission in your local area."
                : "স্বেচ্ছাসেবকরা আমাদের সংস্থার প্রাণ। সময় দান করে আপনি সরাসরি খাবার উদ্ধার, খাবার বিতরণ এবং স্থানীয় মিশনে সাহায্য করতে পারবেন।"
        },
        {
            Icon: Megaphone,
            title: inEng ? "Raise Awareness" : "সচেতনতা বাড়ান",
            text: inEng
                ? "Share our cause with your friends, family, and community. The more people know about food waste, the more we can do to solve the problem. Together, we can inspire change!"
                : "আপনার বন্ধু, পরিবার ও কমিউনিটিতে আমাদের উদ্যোগটি শেয়ার করুন। যত বেশি মানুষ খাবার নষ্ট হওয়ার বিষয় জানবে, আমরা তত বেশি সমাধান করতে পারব। একসাথে আমরা পরিবর্তন আনতে পারি!"
        },
        {
            Icon: DollarSign,
            title: inEng ? "Make a Financial Contribution" : "আর্থিক দান করুন",
            text: inEng
                ? "Monetary donations help us cover operational costs, improve our infrastructure, and expand our reach to rescue even more food. Every dollar goes towards creating a sustainable impact."
                : "আর্থিক দান আমাদের অপারেশনাল খরচ, অবকাঠামো উন্নয়ন এবং আরও বেশি খাবার উদ্ধার করার কাজে সহায়তা করে। প্রতিটি টাকা টেকসই প্রভাব তৈরি করতে ব্যবহৃত হয়।"
        },
        {
            Icon: Handshake,
            title: inEng ? "Partner With Us" : "আমাদের সাথে অংশীদার হোন",
            text: inEng
                ? "Whether you're a local business or an organization, partner with us to rescue surplus food, reduce waste, and share meals with communities in need. Together, we can build a stronger future."
                : "আপনি স্থানীয় ব্যবসা হোন বা সংস্থা, আমাদের সাথে অংশীদার হোন অতিরিক্ত খাবার উদ্ধার, নষ্ট কমানো এবং দরিদ্রদের সাথে খাবার ভাগ করার জন্য। একসাথে আমরা শক্তিশালী ভবিষ্যৎ গড়তে পারি।"
        },
        {
            Icon: HeartHandshake,
            title: inEng ? "Support Our Initiatives" : "আমাদের উদ্যোগগুলোকে সমর্থন করুন",
            text: inEng
                ? "Support our campaigns, events, and projects. By joining forces, we can amplify our impact, encourage others to help, and create a network of individuals working together to fight hunger."
                : "আমাদের প্রচারণা, ইভেন্ট এবং প্রকল্পগুলোকে সমর্থন করুন। একত্রে কাজ করে আমরা প্রভাব বাড়াতে, অন্যদের সাহায্য করতে উৎসাহিত করতে, এবং ক্ষুধার বিরুদ্ধে কাজ করা মানুষের একটি নেটওয়ার্ক তৈরি করতে পারি।"
        }
    ];

    return (
        <section className="bg-[url('/help.png')] bg-cover bg-center bg-no-repeat py-12 px-6 bg-[#FFF7E6] border-x-[10px] border-[#1C2532] mt-[-25px]">
            <div className="backdrop-blur-sm max-w-5xl mx-auto text-center">
                <Header title={inEng ? "How You Can Help" : "আপনি কিভাবে সাহায্য করতে পারেন"} />
                <p className="mt-4 text-lg text-black">
                    {inEng
                        ? "Every small effort counts. Here are a few ways you can make a difference and help us in our mission:"
                        : "প্রত্যেক ছোট চেষ্টা গুরুত্বপূর্ণ। এখানে কিছু উপায় দেখানো হলো যা আপনি আমাদের মিশনে সাহায্য করতে পারেন:"}
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helpOptions.map((option, idx) => (
                        <HelpCard
                            key={idx}
                            Icon={option.Icon}
                            title={option.title}
                            text={option.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

function HelpCard({ Icon, title, text }) {
    return (
        <div className="help-option bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center mb-4 text-[#15803D]">
                <Icon size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-700 text-justify">{text}</p>
        </div>
    );
}

export default HowYouCanHelp;
