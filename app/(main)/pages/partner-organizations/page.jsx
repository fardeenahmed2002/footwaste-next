'use client'
import { Context } from "@/app/contextapi/ContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import OrgSkeleton from "./OrgSkeleton";

const Page = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { inEng } = useContext(Context)

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await axios.get("/api/admin/add-organization");
        if (res.data.success) {
          setOrgs(res.data.organizations);
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchOrgs();
  }, []);

  return (
    <div className="p-6 bg-[#f0f2f5] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Organizations
      </h1>

      {loading ? (
        <OrgSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orgs.map((org) => (
            <div
              key={org._id}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl"
            >
              {org.logo ? (
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden shadow-lg ring-4 ring-[#FFC808] flex items-center justify-center">
                  <img
                    src={org.logo}
                    alt={`${org.titleEn} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 mb-4 rounded-full bg-gray-300 flex items-center justify-center shadow-lg ring-4 ring-purple-400">
                  No Logo
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
                {inEng ? org.titleEn : org.titleBn}
              </h2>

              <p className="text-sm text-gray-600 mb-4 text-justify">
                {inEng ? org.descEn : org.descBn}
              </p>

              <a
                href={org.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-[#FFC808]  text-[#1C2532] hover:bg-[#1C2532] hover:text-[#FFC808] font-medium transition"
              >
                {inEng ? `Visit Site` : `সাইট দেখুন`}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
