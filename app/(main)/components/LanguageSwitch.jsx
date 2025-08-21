"use client"
import { useContext } from "react"
import { Context } from "@/app/contextapi/ContextProvider"

const LanguageSwitch = () => {
  const { inEng, toggleLanguage } = useContext(Context)

  return (
    <div
      onClick={toggleLanguage}
      className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 ${
        inEng ? "bg-purple-600" : "bg-green-600"
      }`}
    >
      {/* EN & BN Labels */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">
        EN
      </span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">
        BN
      </span>

      {/* Sliding Circle */}
      <div
        className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center font-bold text-black ${
          inEng ? "left-1" : "right-1"
        }`}
      >
        {inEng ? "E" : "B"}
      </div>
    </div>
  )
}

export default LanguageSwitch
