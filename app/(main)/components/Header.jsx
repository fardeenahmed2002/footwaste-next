import { Noto_Serif } from "next/font/google"

const notoserif = Noto_Serif({
    subsets: ['latin'],
    weight: '800',
})

const Header = ({ children }) => {
    return (
        <div className="mt-[10px]">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center px-4">
                <h2 className={`text-2xl sm:text-4xl ${notoserif.className} text-black`}>
                    {children}
                </h2>
            </div>
        </div>
    )
}

export default Header
