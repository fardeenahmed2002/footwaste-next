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
        <div className=" tabs tabs-boxed flex justify-around items-center h-[80px] bg-gradient-to-r from-amber-100 to-lime-100 shadow-md rounded-xl px-6">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link href={tab.href} key={tab.href}>
                        <div
                            className={`tab flex items-center gap-2 px-4 py-2 text-base font-semibold transition-all duration-200 ease-in-out rounded-md
                            ${isActive
                                ? 'tab-active text-white bg-green-600 shadow-md'
                                : 'text-green-800 hover:bg-green-100'
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
