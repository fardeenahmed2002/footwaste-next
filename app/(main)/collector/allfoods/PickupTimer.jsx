"use client"
import { useEffect, useState } from "react"

export default function PickupTimer({ createdAt, pickupTime }) {
  const [timeLeft, setTimeLeft] = useState("")
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (!createdAt || !pickupTime) return

    // createdAt থেকে Date বানানো
    const createdDate = new Date(createdAt)

    // pickupTime ("HH:mm") কে ভেঙে নেওয়া
    const [pickupHour, pickupMinute] = pickupTime.split(":").map(Number)

    // ডেডলাইন বানানো = createdAt এর দিন + pickupTime
    const deadline = new Date(createdDate)
    deadline.setHours(pickupHour, pickupMinute, 0, 0)

    const updateTimer = () => {
      const now = new Date()
      const diff = deadline - now

      if (diff <= 0) {
        setExpired(true)
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      )
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [createdAt, pickupTime])

  return (
    <div className="p-2 rounded bg-[#1c2333] text-white text-center">
      {expired ? (
        <span className="text-red-400 font-bold">⏰ Expired</span>
      ) : (
        <span>⏳ Time Left To Pick: {timeLeft}</span>
      )}
    </div>
  )
}
