"use client";
import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 w-full h-1 bg-transparent z-[9999]"
      style={{ top: "125px" }}
    >
      <div
        className="h-1 transition-all duration-150"
        style={{
          width: `${scroll}%`,
          background: "linear-gradient(to right, white, #FFC808)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
