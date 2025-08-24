"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

export default function Footer() {
  const [showLinks, setShowLinks] = useState(false)
  const [showResources, setShowResources] = useState(false)

  return (
    <div className="relative border-x-[10px] border-b-[10px] bg-[#1C2532] border-[#1C2532] rounded-b-3xl overflow-hidden">
      <footer className="relative z-10 text-white pt-8 pb-6 px-4 md:px-12 rounded-b-3xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          <div>
            <h2 className="text-xl font-bold mb-3">Food Waste Rescue</h2>
            <p className="text-sm text-gray-300 hidden md:block">
              We're on a mission to reduce food waste and hunger by connecting food donors with people in need.
            </p>
          </div>

          <div>
            <h3
              className="text-lg font-semibold mb-3 cursor-pointer md:cursor-auto flex justify-between items-center md:block"
              onClick={() => setShowLinks(!showLinks)}
            >
              Quick Links
              <span className="md:hidden">{showLinks ? '-' : '+'}</span>
            </h3>
            <ul
              className={`space-y-2 text-sm text-gray-300 overflow-hidden transition-max-height duration-300 ease-in-out ${
                showLinks ? 'max-h-40' : 'max-h-0'
              } md:max-h-full`}
            >
              <li><Link href="/"><p className="hover:underline">Home</p></Link></li>
              <li><Link href="/how-you-can-help"><p className="hover:underline">How You Can Help</p></Link></li>
              <li><Link href="/about"><p className="hover:underline">About Us</p></Link></li>
              <li><Link href="/contact"><p className="hover:underline">Contact</p></Link></li>
            </ul>
          </div>

    
          <div>
            <h3
              className="text-lg font-semibold mb-3 cursor-pointer md:cursor-auto flex justify-between items-center md:block"
              onClick={() => setShowResources(!showResources)}
            >
              Resources
              <span className="md:hidden">{showResources ? '-' : '+'}</span>
            </h3>
            <ul
              className={`space-y-2 text-sm text-gray-300 overflow-hidden transition-max-height duration-300 ease-in-out ${
                showResources ? 'max-h-40' : 'max-h-0'
              } md:max-h-full`}
            >
              <li><Link href="/faq"><p className="hover:underline">FAQ</p></Link></li>
              <li><Link href="/blog"><p className="hover:underline">Blog</p></Link></li>
              <li><Link href="/pages/policy"><p className="hover:underline">Policy</p></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl text-gray-300">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} FoodRescue. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
