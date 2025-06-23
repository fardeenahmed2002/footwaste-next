"use client"
import Link from "next/link"
import Image from "next/image"
const Logo = () => {
    return (
        <div className="flex items-center gap-3 bg-[#6baed6]/10 backdrop-blur-md p-2 px-4 rounded-full border border-white/30 shadow">
            <Link href="/">
                <Image
                    src="/sitelogo.jpeg"
                    alt="Logo"
                    width={44}
                    height={44}
                    className="rounded-full shadow"
                />
            </Link>
            <h1 className="text-2xl font-extrabold text-white drop-shadow-sm">
                Food Waste Rescue
            </h1>
        </div>
    )
}

export default Logo
