"use client"
import Header from "../../components/Header.jsx"
import Link from "next/link"

const JoinUs = () => {
    return (
        <div className='border-x-[20px] mt-[-25px] border-[#3B42D2] border-double'>
            <div className="bg-green-600 text-white p-8 text-center rounded-lg w-[95%] ml-[35px]">
                <Header childern={`Be Part of the Change`} />
                <p className="">Join us in rescuing food and feeding communities.</p><br />
                <button className="mb-4 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg">
                    <Link href='/signup'>Join Us</Link>
                </button>
            </div>

        </div>
    )
}

export default JoinUs
