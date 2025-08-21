"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import { Globe2, Handshake, Heart, Sprout, Utensils } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import Header from "../../components/Header.jsx";

export default function JoinUs() {
  const { inEng } = useContext(Context)
  return (
    <div className="relative bg-[url('/joinusbg.jpg')] bg-cover border-x-[10px] border-[#2171b5]">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 text-white rounded-lg">
        <Header title={inEng ? `Be Part of the Change` : `পরিবর্তনে যোগ দিন`} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {inEng ? (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                Together, we can turn{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Sprout className="w-5 h-5 text-green-400" />
                  <span>surplus food into hope</span>
                </span>
                .
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                By joining our mission, you help{" "}
                <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                  <Utensils className="w-5 h-5" />
                  <span>fight hunger</span>
                </span>
                , reduce waste, and build stronger communities{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Handshake className="w-5 h-5 text-cyan-400" />
                </span>
                .
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                Every contribution matters, no matter how small. When we share resources wisely, we create a future where no one goes hungry.
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                Be the change that{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span>nourishes lives</span>
                </span>{" "}
                and{" "}
                <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                  <Globe2 className="w-5 h-5" />
                  <span>protects our planet</span>
                </span>
                . Join us today and help build a kinder, greener world.
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                একসাথে, আমরা{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Sprout className="w-5 h-5 text-green-400" />
                  <span>অতিরিক্ত খাবারকে আশা এ পরিণত করতে পারি</span>
                </span>
                .
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                আমাদের মিশনে যোগ দিয়ে, আপনি সাহায্য করছেন{" "}
                <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                  <Utensils className="w-5 h-5" />
                  <span>ক্ষুধার বিরুদ্ধে লড়াই করতে</span>
                </span>
                , অপচয় কমাতে এবং কমিউনিটিকে শক্তিশালী করতে{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Handshake className="w-5 h-5 text-cyan-400" />
                </span>
                .
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                প্রতিটি অবদান গুরুত্বপূর্ণ, যত ছোটই হোক না কেন। যখন আমরা সম্পদগুলো বুদ্ধিমত্তার সঙ্গে ভাগ করি, আমরা এমন একটি ভবিষ্যৎ তৈরি করি যেখানে কেউ ক্ষুধার্ত থাকবে না। আপনার অংশগ্রহণ স্থানীয় কৃষকদের সমর্থন করে, কার্বন ফুটপ্রিন্ট কমায় এবং প্রজন্ম জুড়ে আশা জাগায়।
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 tracking-wide shadow-lg text-white border border-white/20">
                হোন সেই পরিবর্তনের অংশ যা{" "}
                <span className="font-semibold inline-flex items-center space-x-1">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span>জীবনকে পুষ্টি দেয়</span>
                </span>{" "}
                এবং{" "}
                <span className="font-semibold inline-flex items-center space-x-1 text-yellow-300">
                  <Globe2 className="w-5 h-5" />
                  <span>পৃথিবীকে রক্ষা করে</span>
                </span>
                । আজই আমাদের সাথে যোগ দিন এবং একটি উদার, সবুজ পৃথিবী গড়তে সাহায্য করুন।
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center md:text-left">
          <Link href="/signup" passHref>
            <button
              aria-label="Join us signup page"
              className="bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
            >
              {inEng ? "Join Us" : "আমাদের সাথে যোগ দিন"}
            </button>
          </Link>
        </div>
      </div>
    </div>

  );
}
