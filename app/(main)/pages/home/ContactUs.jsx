"use client";
import { Context } from "@/app/contextapi/ContextProvider.jsx";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import Header from "../../components/Header.jsx";

export default function ContactUs() {
  const [place, setPlace] = useState("Uttara");
  const [input, setInput] = useState("");
  const { inEng } = useContext(Context)
  const handleSearch = () => {
    if (input.trim() !== "") {
      setPlace(input.trim());
    }
  };

  return (
    <motion.div
      whileInView={{ y: [200, 0] }}
      transition={{ delay: 0.25, duration: 1 }}
      className="relative border-x-[10px] border-[#1C2532] py-16 px-4"
    >
    
      <div className="relative z-10 w-full max-w-6xl mx-auto p-6 text-white">
        <Header title={inEng ? "Contact Us" : "যোগাযোগ করুন"} />

        <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed text-center text-black">
          {inEng
            ? "Whether you're interested in volunteering, donating, or just want to say hello — we’d love to hear from you. Our team is dedicated to building a stronger, more sustainable community by reducing food waste and fighting hunger. Reach out anytime!"
            : "আপনি যদি স্বেচ্ছাসেবক হিসেবে অংশ নিতে চান, দান করতে চান, বা কেবল হ্যালো বলতে চান — আমরা আপনার কাছ থেকে শোনা পছন্দ করব। আমাদের দল খাদ্য অপচয় কমিয়ে এবং ক্ষুধার বিরুদ্ধে লড়াই করে একটি শক্তিশালী, টেকসই কমিউনিটি গড়তে প্রতিশ্রুতিবদ্ধ। যে কোনো সময় যোগাযোগ করুন!"}
        </p>


        <div className="mt-12 flex flex-col-reverse lg:flex-row gap-12">
          {/* Info Block */}
          <div className="relative flex-1 space-y-6 p-6 rounded-xl shadow-xl bg-[#1C2532] text-white">
            <div className="absolute inset-0 pointer-events-none z-0" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <p className="text-lg font-semibold">Phone</p>
                  <p className="text-base">+880 1933378486</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-lg font-semibold">Email</p>
                  <p className="text-base">contact@foodrescue.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-yellow-300 mt-1" />
                <div>
                  <p className="text-lg font-semibold">Address</p>
                  <p className="text-base">House #129, Road #39, Sector #40, Uttara, Dhaka, Bangladesh</p>
                </div>
              </div>
              <motion.button
                className="mt-4 hover:border-1 border-[#FFC808] bg-[#FFC808] text-black hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-6 py-3 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Link href="/contact">Get in Touch</Link>
              </motion.button>
            </div>
          </div>

          {/* Map Block */}
          <div className="relative flex-1 space-y-4 bg-[#1C2532]  p-6 rounded-xl shadow-xl border border-white/20 text-black">
            <div className="relative z-10 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search location..."
                  className="w-full px-4 py-2 rounded-lg border border-white text-white outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] border-1 hover:border-[#FFC808] px-4 py-2 rounded-lg font-semibold"
                >
                  Search
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/30">
                <iframe
                  title="Google Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl w-full min-h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
