"use client"

import { Context } from "@/app/contextapi/ContextProvider";
import { useContext } from "react";
import Link from "next/link";
import {
  Home, Info, Phone, HandHelping, FileText, Hamburger
} from "lucide-react";

const NavPages = () => {
  const navLinkClass =
    "flex items-center gap-2 text-white hover:text-green-950 font-semibold px-4 py-2 rounded-full transition-all bg-[#6baed6]/10 backdrop-blur-md border border-white/30 shadow-sm w-full md:w-auto";

  const { user } = useContext(Context);

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
      {!user?.role === `collector` && (
        <div>
          <Link href="/" className={navLinkClass}>
            <Home size={18} /> Home
          </Link>
          <Link href="/pages/about" className={navLinkClass}>
            <Info size={18} /> About
          </Link>
          <Link href="/pages/contactus" className={navLinkClass}>
            <Phone size={18} /> Contact
          </Link>
        </div>
      )}


      <Link href={'/collector/allfoods'} className={navLinkClass}>
        <Hamburger size={18} /> Donated Foods
      </Link>
      <Link href="/pages/allblogs" className={navLinkClass}>
        <FileText size={18} /> Blogs
      </Link>

      {user?.isVerified && user?.role === "user" && (
        <Link href="/user/donate" className={navLinkClass}>
          <HandHelping size={18} /> Donate
        </Link>
      )}

      {user?.isVerified && user?.role === "donor" && (
        <Link href="/donor" className={navLinkClass}>
          <HandHelping size={18} /> Donate
        </Link>
      )}
    </div>
  );
};

export default NavPages;
