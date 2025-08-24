import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ContextProvider from "../contextapi/ContextProvider"
import "../globals.css"
import ChatWidget from "./components/ChatWidget"
import Navbar from "./components/Navbar"
import ScrollProgress from "./components/ScrollProgress"
export const metadata = {
  title: "খাদ্য বাঁচাও",
  description: "Help reduce food waste and support local communities.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ContextProvider>
          <Navbar />
          <ScrollProgress />
          <ChatWidget />
          {children}
          <ToastContainer position="top-center" />
        </ContextProvider>
      </body>
    </html>
  )
}
