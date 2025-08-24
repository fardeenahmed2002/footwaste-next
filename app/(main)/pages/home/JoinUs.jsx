"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import { Globe2, Handshake, Heart, Sprout, Utensils } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import Header from "../../components/Header.jsx";

export default function JoinUs() {
  const { inEng } = useContext(Context);
  return (
    <div className="relative border-x-[10px] border-[#1C2532] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="absolute inset-0 backdrop-blur-[5px] z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-12 text-black rounded-lg">
        <Header title={inEng ? `Be Part of the Change` : `পরিবর্তনে যোগ দিন`} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {inEng ? (
            <>
              <Card
                icon={<Sprout className="w-7 h-7 text-green-400" />}
                text={
                  <>
                    Together, we can turn{" "}
                    <span className="font-semibold text-green-500">
                      surplus food into hope
                    </span>
                    .
                  </>
                }
              />
              <Card
                icon={<Utensils className="w-7 h-7 text-yellow-400" />}
                text={
                  <>
                    By joining our mission, you help{" "}
                    <span className="font-semibold text-yellow-500">
                      fight hunger
                    </span>
                    , reduce waste, and build stronger communities{" "}
                    <Handshake className="inline w-6 h-6 text-cyan-400 ml-1" />
                  </>
                }
              />
              <Card
                icon={<Heart className="w-7 h-7 text-pink-500" />}
                text={
                  <>
                    Every contribution matters. When we share resources wisely,
                    we create a future where no one goes hungry.
                  </>
                }
              />
              <Card
                icon={<Globe2 className="w-7 h-7 text-blue-400" />}
                text={
                  <>
                    Be the change that{" "}
                    <span className="font-semibold text-red-500">
                      nourishes lives
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-blue-500">
                      protects our planet
                    </span>
                    . Join us today and help build a kinder, greener world.
                  </>
                }
              />
            </>
          ) : (
            <>
              <Card
                icon={<Sprout className="w-7 h-7 text-green-400" />}
                text={
                  <>
                    একসাথে, আমরা{" "}
                    <span className="font-semibold text-green-500">
                      অতিরিক্ত খাবারকে আশা এ পরিণত করতে পারি
                    </span>
                    ।
                  </>
                }
              />
              <Card
                icon={<Utensils className="w-7 h-7 text-yellow-400" />}
                text={
                  <>
                    আমাদের মিশনে যোগ দিয়ে, আপনি সাহায্য করছেন{" "}
                    <span className="font-semibold text-yellow-500">
                      ক্ষুধার বিরুদ্ধে লড়াই করতে
                    </span>
                    , অপচয় কমাতে এবং কমিউনিটিকে শক্তিশালী করতে{" "}
                    <Handshake className="inline w-6 h-6 text-cyan-400 ml-1" />
                    ।
                  </>
                }
              />
              <Card
                icon={<Heart className="w-7 h-7 text-pink-500" />}
                text={
                  <>
                    প্রতিটি অবদান গুরুত্বপূর্ণ। যখন আমরা সম্পদগুলো
                    বুদ্ধিমত্তার সঙ্গে ভাগ করি, আমরা এমন একটি ভবিষ্যৎ তৈরি করি
                    যেখানে কেউ ক্ষুধার্ত থাকবে না।
                  </>
                }
              />
              <Card
                icon={<Globe2 className="w-7 h-7 text-blue-400" />}
                text={
                  <>
                    হোন সেই পরিবর্তনের অংশ যা{" "}
                    <span className="font-semibold text-red-500">
                      জীবনকে পুষ্টি দেয়
                    </span>{" "}
                    এবং{" "}
                    <span className="font-semibold text-blue-500">
                      পৃথিবীকে রক্ষা করে
                    </span>
                    । আজই আমাদের সাথে যোগ দিন এবং একটি উদার, সবুজ পৃথিবী গড়তে
                    সাহায্য করুন।
                  </>
                }
              />
            </>
          )}
        </div>

        <div className="mt-12 text-center md:text-left">
          <Link href="/pages/add-volunteer" passHref>
            <button
              className="bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {inEng ? "Join Us" : "আমাদের সাথে যোগ দিন"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, text }) {
  return (
    <div className="bg-gradient-to-br from-white/90 to-gray-100/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-out relative">
      <div className="flex items-start space-x-3">
        <div className="p-3 bg-white rounded-full shadow-md">{icon}</div>
        <p className="text-gray-800 text-lg leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
