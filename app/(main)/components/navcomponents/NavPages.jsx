"use client";

import { Context } from "@/app/contextapi/ContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const NavPages = () => {
  const { user, inEng } = useContext(Context);
  const router = useRouter();

  const navLinkClass =
    "px-3 py-2 text-sm font-bold text-gray-800 hover:text-black transition whitespace-nowrap cursor-pointer";

  // handle navigation based on verification
  const handleNavClick = (href) => {
    if (user && !user.isVerified) {
      if (user.role === `collector`) {
        router.push("/pages/verification/otp")
      }
      else {
        router.push("/pages/verification")
      }
    } else {
      router.push(href)
    }
  }
  return (
    <div className="w-full flex justify-center">
      <nav className="flex flex-nowrap px-6 py-3 rounded-full bg-white shadow-md overflow-x-auto">

        {/* Public routes */}
        {!user && (
          <>
            <button onClick={() => handleNavClick("/")} className={navLinkClass}>
              {inEng ? "Home" : "প্রধান পাতা"}
            </button>
            <button onClick={() => handleNavClick("/pages/about")} className={navLinkClass}>
              {inEng ? "About Us" : "আমাদের সম্পর্কে"}
            </button>
            <button onClick={() => handleNavClick("/pages/day")} className={navLinkClass}>
              {inEng ? "Our NGOs" : "আমাদের এনজিও"}
            </button>
            <button onClick={() => handleNavClick("/pages/contactus")} className={navLinkClass}>
              {inEng ? "Contact" : "যোগাযোগ"}
            </button>
            <button onClick={() => handleNavClick("/pages/allblogs")} className={navLinkClass}>
              {inEng ? "Blogs" : "ব্লগ"}
            </button>
            <button onClick={() => handleNavClick("/pages/partner-organizations")} className={navLinkClass}>
              {inEng ? "Partner Organizations" : "সহযাত্রী সংগঠন"}
            </button>
          </>
        )}

        {/* Collector routes */}
        {user?.role === "collector" && user?.isVerified && (
          <>
            <button onClick={() => handleNavClick("/collector/allfoods")} className={navLinkClass}>
              {inEng ? "Donated Foods" : "দানকৃত খাবার"}
            </button>
            <button onClick={() => handleNavClick("/collector/day")} className={navLinkClass}>
              {inEng ? "Post a Day" : "একদিনের পোস্ট"}
            </button>
            <button onClick={() => handleNavClick("/collector/requestedFoods")} className={navLinkClass}>
              {inEng ? "Requested foods" : "অনুরোধকৃত খাবার"}
            </button>
          </>
        )}

        {/* User routes */}
        {user?.role === "user" && user?.isVerified && (
          <>
            <button onClick={() => handleNavClick("/user/donate")} className={navLinkClass}>
              {inEng ? "Donate" : "দান করুন"}
            </button>
            <button onClick={() => handleNavClick("/pages/day")} className={navLinkClass}>
              {inEng ? "Posts" : "পোস্টস"}
            </button>
            <button onClick={() => handleNavClick("/user/donate/donatedfoods")} className={navLinkClass}>
              {inEng ? "Donated foods" : "দানকৃত খাবার"}
            </button>
          </>
        )}

        {/* Donor routes */}
        {user?.role === "donor" && user?.isVerified && (
          <button onClick={() => handleNavClick("/donor")} className={navLinkClass}>
            {inEng ? "Donate" : "দান করুন"}
          </button>
        )}

        {/* Admin routes */}
        {user?.role === "admin" && user?.isVerified && (
          <button onClick={() => handleNavClick("/admin")} className={navLinkClass}>
            {inEng ? "Home" : "প্রধান পাতা"}
          </button>
        )}

      </nav>
    </div>
  );
};

export default NavPages;
