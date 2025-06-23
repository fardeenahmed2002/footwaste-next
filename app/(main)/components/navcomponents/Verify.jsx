"use client"
import Link from "next/link"
const Verify = () => {
    return (
        <div className="relative z-10 flex justify-center py-2 mb-2 bg-yellow-100/80 backdrop-blur-sm rounded-md shadow">
            <span className="text-sm text-yellow-900 font-medium">
                Your account isn’t verified. Please{' '}
                <Link href="/pages/verification" className="underline text-yellow-900 hover:text-yellow-700">
                    verify now
                </Link>{' '}
                to unlock all features.
            </span>
        </div>
    )
}

export default Verify
