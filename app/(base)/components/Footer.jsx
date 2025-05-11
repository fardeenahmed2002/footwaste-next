"use client"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="border-x-[20px] border-b-[20px] border-[#3B42D2] border-double mt-[-25px] bg-[#16A34A] rounded-b-3xl">
          <footer className="text-white pt-12 pb-6 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    
              {/* About */}
              <div>
                <h2 className="text-xl font-bold mb-4">FoodRescue</h2>
                <p className="text-sm text-gray-300">
                  We're on a mission to reduce food waste and hunger by connecting food donors with people in need.
                </p>
              </div>
    
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/" className="hover:underline">Home</a></li>
                  <li><a href="/how-you-can-help" className="hover:underline">How You Can Help</a></li>
                  <li><a href="/about" className="hover:underline">About Us</a></li>
                  <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
              </div>
    
              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/faq" className="hover:underline">FAQ</a></li>
                  <li><a href="/blog" className="hover:underline">Blog</a></li>
                  <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                  <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                </ul>
              </div>
    
              {/* Social Media */}
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
    
            {/* Bottom Line */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} FoodRescue. All rights reserved.
            </div>
          </footer>
        </div>
      );
}

export default Footer
