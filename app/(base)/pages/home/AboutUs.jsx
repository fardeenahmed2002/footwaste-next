import Link from "next/link"
import Header from "../../components/Header.jsx"
const AboutUs = () => {
    return (
        <div
          className="bg-[url('/abt.png')] bg-cover bg-center bg-no-repeat text-center border-x-[20px] mt-[-25px] border-[#3B42D2] border-double py-20 px-4"
        >
          <div className="backdrop-blur-sm rounded-xl p-10 mx-auto shadow-lg">
            <Header childern={`About us`} />
            <p className="mt-4 text-lg text-gray-800">
              We are a mission-driven organization focused on reducing food waste and combating hunger.
              Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
              Join us in our journey to make a positive impact on the world, one meal at a time.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
}

export default AboutUs
