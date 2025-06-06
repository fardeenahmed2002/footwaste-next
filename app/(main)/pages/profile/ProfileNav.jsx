'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HandHeart, PenLine, ShoppingCart } from "lucide-react"

const ProfileNav = () => {
    const pathname = usePathname()

    const tabs = [
        {
            label: 'Donated Foods',
            href: '/pages/profile/donatedfoods',
            icon: <HandHeart size={18} />,
        },
        {
            label: 'My Blogs',
            href: '/pages/profile/blog',
            icon: <PenLine size={18} />,
        },
        {
            label: 'Sold Foods',
            href: '/pages/profile/soldfoods',
            icon: <ShoppingCart size={18} />,
        },
    ]

    return (
        <div className="tabs tabs-boxed flex justify-around items-center h-[80px] bg-[#fff7e6]/70 z-50 backdrop-blur-md shadow-md rounded-xl px-6">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-0" />
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link href={tab.href} key={tab.href}>
                        <div
                            className={`tab flex items-center gap-2 px-4 py-2 text-base font-semibold transition-all duration-200 ease-in-out rounded-full border relative z-10 shadow-2xl
                            ${isActive
                                ? '!text-black bg-green-600 border-black'
                                : 'text-green-800 bg-white/30 backdrop-blur-md border-white/30 shadow-sm hover:bg-white/40'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfileNav
