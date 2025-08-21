"use client"
import Link from "next/link"
import Image from "next/image"
const Logo = () => {
    return (
        <div className="w-[350px] flex items-center gap-3 backdrop-blur-md p-2 px-4 rounded-full ">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={300}
                    height={150}
                    className=""
                />
            </Link>
            {/* <h1 className="text-2xl font-extrabold text-white drop-shadow-sm">
                খাদ্য বাঁচাও
            </h1> */}
        </div>
    )
}

export default Logo
