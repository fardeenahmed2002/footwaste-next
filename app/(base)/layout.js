import "../globals.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import ContextProvider from "../contextapi/ContextProvider";
export const metadata = {
  title: "Food Waste Rescue",
  description: "Help reduce food waste and support local communities.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ContextProvider>
          <Navbar />
          <ChatWidget />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
