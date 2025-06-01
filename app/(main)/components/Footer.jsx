import React from 'react'
import Link from 'next/link'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="relative border-x-[10px] border-b-[10px] border-[#FFF7E6] rounded-b-3xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/footer.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black opacity-60" />

      <footer className="relative z-10 text-white pt-12 pb-6 px-6 md:px-12 rounded-b-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Food Waste Rescue</h2>
            <p className="text-sm text-gray-300">
              We're on a mission to reduce food waste and hunger by connecting food donors with people in need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/">
                  <p className="hover:underline">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/how-you-can-help">
                  <p className="hover:underline">How You Can Help</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p className="hover:underline">About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:underline">Contact</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/faq">
                  <p className="hover:underline">FAQ</p>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <p className="hover:underline">Blog</p>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <p className="hover:underline">Terms & Conditions</p>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <p className="hover:underline">Privacy Policy</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
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
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} FoodRescue. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
