import { useEffect, useState } from "react";

const CountDown = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expiry = new Date(expiryDate);
            const diff = expiry - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(interval);
                return;
            }

            const hrs = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hrs}h : ${mins}m : ${secs}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryDate]);

    return (
        <p className=" text-[black] font-semibold text-center rounded-xl px-4 py-2 shadow-md shadow-[#BB71FF]/20 max-w-[350px] mx-auto mb-[10px]">
            ⏰ Time to expire: {timeLeft}
        </p>
    )
}

export default CountDown
