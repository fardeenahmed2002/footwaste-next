"use client"

import { Context } from "@/app/contextapi/ContextProvider"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const Logo = () => {
    const { user } = useContext(Context)
    const router = useRouter()

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (user && !user.isVerified) {
            if (user.role === `collector`) {
                router.push("/pages/verification/otp")
            }
            else {
                router.push("/pages/verification")
            }
        } else {
            router.push("/")
        }
    }

    return (
        <div className="w-[350px] flex items-center gap-3 backdrop-blur-md p-2 px-4 rounded-full ">
            <a href="/" onClick={handleLogoClick}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={300}
                    height={150}
                />
            </a>
        </div>
    )
}

export default Logo
