"use client";
import { loginPolicy, signupPolicy } from "./Policy";

const PolicySection = ({ title, points }) => (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {points.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ul>
    </div>
);

const PoliciesPage = () => {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">
                Login & Signup Policies
            </h1>

            <PolicySection title="Login Policy" points={loginPolicy} />
            <PolicySection title="Signup Policy" points={signupPolicy} />
        </div>
    );
};

export default PoliciesPage;
