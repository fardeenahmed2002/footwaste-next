import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "Food Waste Rescue",
    description: "Help reduce food waste and support local communities.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function SubLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 min-h-screen">
                <div className="flex flex-col md:flex-row min-h-screen">
                  
                    <aside className="bg-white shadow-md w-full md:w-64 p-6 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h2>
                        <Link
                            href={`/admin/history`}
                            className="px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
                        >
                            Accepted Foods
                        </Link>
                        <Link
                            href={`/admin/history/rejected`}
                            className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Rejected Foods
                        </Link>
                    </aside>

                
                    <main className="flex-1 p-6 bg-gray-50">
                        {children}
                    </main>
                </div>

                <ToastContainer position="top-center" />
            </body>
        </html>
    );
}
