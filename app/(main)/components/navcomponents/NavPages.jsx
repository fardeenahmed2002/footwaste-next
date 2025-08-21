"use client";

import { Context } from "@/app/contextapi/ContextProvider";
import Link from "next/link";
import { useContext } from "react";

const NavPages = () => {
  const { user, inEng } = useContext(Context);

  const navLinkClass =
    "px-3 py-2 text-sm font-bold text-gray-800 hover:text-black transition whitespace-nowrap";

  return (
    <div className="w-full flex justify-center">
      <nav className="flex flex-nowrap px-6 py-3 rounded-full bg-white shadow-md overflow-x-auto">
        
        {/* Public routes */}
        {user?.role !== "collector" &&
          user?.role !== "user" &&
          user?.role !== "admin" &&
          user?.role !== "donor" && (
            <>
              <Link href="/" className={navLinkClass}>
                {inEng ? "Home" : "প্রধান পাতা"}
              </Link>
              <Link href="/pages/about" className={navLinkClass}>
                {inEng ? "About Us" : "আমাদের সম্পর্কে"}
              </Link>
              <Link href="/pages/day" className={navLinkClass}>
                {inEng ? "Our NGOs" : "আমাদের এনজিও"}
              </Link>
              <Link href="/pages/contactus" className={navLinkClass}>
                {inEng ? "Contact" : "যোগাযোগ"}
              </Link>
              <Link href="/pages/allblogs" className={navLinkClass}>
                {inEng ? "Blogs" : "ব্লগ"}
              </Link>
              <Link href="/pages/partner-organizations" className={navLinkClass}>
                {inEng ? "Partner Organizations" : "সহযাত্রী সংগঠন"}
              </Link>
            </>
          )}

        {/* Collector routes */}
        {user?.role === "collector" && user?.isVerified && (
          <>
            <Link href="/collector/allfoods" className={navLinkClass}>
              {inEng ? "Donated Foods" : "দানকৃত খাবার"}
            </Link>
            <Link href="/collector/day" className={navLinkClass}>
              {inEng ? "Post a Day" : "একদিনের পোস্ট"}
            </Link>
          </>
        )}

        {/* User routes */}
        {user?.isVerified && user?.role === "user" && (
          <>
            <Link href="/user/donate" className={navLinkClass}>
              {inEng ? "Donate" : "দান করুন"}
            </Link>
            <Link href="/pages/day" className={navLinkClass}>
              {inEng ? "Our NGOs" : "আমাদের এনজিও"}
            </Link>
          </>
        )}

        {/* Donor routes */}
        {user?.isVerified && user?.role === "donor" && (
          <Link href="/donor" className={navLinkClass}>
            {inEng ? "Donate" : "দান করুন"}
          </Link>
        )}

        {/* Admin routes */}
        {user?.isVerified && user?.role === "admin" && (
          <Link href="/admin" className={navLinkClass}>
            {inEng ? "Home" : "প্রধান পাতা"}
          </Link>
        )}

      </nav>
    </div>
  );
};

export default NavPages;
