'use client'
import React from 'react'
import { Medal, Gift, Star, Gem, Trophy } from 'lucide-react'

const badges = [
  {
    level: 'Bronze',
    icon: <Medal className="text-amber-700 w-6 h-6" />,
    requirement: 150,
    description: 'Supporters who have donated a total of 150৳ or more.',
  },
  {
    level: 'Silver',
    icon: <Gift className="text-gray-400 w-6 h-6" />,
    requirement: 500,
    description: 'Generous donors who have given at least 500৳.',
  },
  {
    level: 'Gold',
    icon: <Star className="text-yellow-400 w-6 h-6" />,
    requirement: 3000,
    description: 'Outstanding contributors who donated 3000৳ or more.',
  },
  {
    level: 'Diamond',
    icon: <Gem className="text-blue-400 w-6 h-6" />,
    requirement: 7000,
    description: 'Our most elite donors, who contributed 7000৳ or more.',
  },
]

const page = () => {
  return (
    <div className="min-h-[calc(100vh-87px)] bg-gradient-to-br from-green-100 to-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-6 text-center">
          🎖 Donor Badges System
        </h1>
        <p className="text-gray-700 text-center mb-10">
          Get recognized for your generosity! Earn badges as you donate and show your support in style.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-50 border-l-4 border-green-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>{badge.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-green-700">{badge.level} Badge</h2>
                <p className="text-sm text-gray-600">{badge.description}</p>
                <p className="text-sm text-gray-800 mt-1 font-medium">
                  🎯 Requirement: <span className="font-bold">{badge.requirement} foods</span> total donation
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
