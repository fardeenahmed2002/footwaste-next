"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Page = () => {
  const [alldays, setAlldays] = useState([]);

  const getAlldays = async () => {
    try {
      const { data } = await axios.get("/api/day");
      if (data.success) {
        setAlldays(data.days);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAlldays();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Days</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {alldays.map((day, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden"
            style={{ width: "300px", height: "425px" }}
          >
            {/* Main Image */}
            {day.image && (
              <div className="relative w-full h-48">
                <Image
                  src={day.image}
                  alt={day.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 p-4 flex flex-col justify-between">
              {/* Blogger info */}
              <div className="flex items-center gap-3 mb-3">
                {day.blogger?.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={day.blogger.image}
                      alt={day.blogger.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                )}

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    {day.blogger?.name || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {day.createdAt
                      ? dayjs(day.createdAt).fromNow()
                      : "Unknown time"}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {day.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-3">
                {day.content || "No description available"}
              </p>
            </div>
          </div>
        ))}

        {alldays.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No days found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
