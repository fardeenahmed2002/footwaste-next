import { Noto_Serif } from "next/font/google"
const notoserif = Noto_Serif({
    subsets: ['latin'],
    weight:'800'
});

const Header = ({ children }) => {
    return (
        <div>
            <div className='flex flex-row items-center justify-center gap-5'>
                <img src="/borderleft.png" alt="" />
                <h2 className={`text-4xl ${notoserif.className} text-center text-black`}>{children}</h2> <br />
                <img src="/borderright.png" alt="" />
            </div>
        </div>
    )
}

export default Header
