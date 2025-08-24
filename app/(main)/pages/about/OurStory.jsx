'use client'
import { Context } from "@/app/contextapi/ContextProvider";
import { useContext } from "react";
import Header from "../../components/Header";
const OurStory = () => {
  const { inEng } = useContext(Context);
  return (
    <section
      className="
        bg-[url('/story.png')] bg-cover bg-center bg-no-repeat
        mt-[-25px] sm:mt-0
        py-12 px-4 sm:px-6
        border-x-[10px] border-t-[10px]
        border-[#1C2532]
      "
    >
      <div className="backdrop-blur-sm max-w-5xl mx-auto shadow-2xl p-6 sm:p-8 rounded-3xl glow-blue-border bg-white/20">
        <Header title={inEng ? "How We Work" : "আমরা কীভাবে কাজ করি"} />
        <div className="mt-6 space-y-8 text-gray-800 dark:text-gray-200">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Donor Options" : "ডোনারের বিকল্পসমূহ"}
            </h2>
            <p className="mb-2">
              {inEng
                ? "Anyone can easily donate through money or food via our platform. There are three options for donors:"
                : "আমাদের প্ল্যাটফর্মের মাধ্যমে যে কেউ সহজেই টাকা বা খাবার দান করতে পারেন। ডোনারদের জন্য তিনটি বিকল্প রয়েছে:"}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                {inEng
                  ? "Anonymous Donation: Contribute online without revealing identity."
                  : "অজ্ঞাতনামা দান: পরিচয় প্রকাশ না করে অনলাইনে দান করতে পারেন।"}
              </li>
              <li>
                {inEng
                  ? "Detail-based Donation: Provide name, phone, or other details for one-time or recurring donations."
                  : "বিস্তারিত ভিত্তিক দান: এককালীন বা নিয়মিত দানের জন্য নাম, ফোন বা অন্যান্য তথ্য প্রদান করতে পারেন।"}
              </li>
              <li>
                {inEng
                  ? "Account-based Donation: Create an account to make regular monetary or food contributions."
                  : "অ্যাকাউন্ট-ভিত্তিক দান: নিয়মিত অর্থ বা খাবারের দানের জন্য একটি অ্যাকাউন্ট তৈরি করুন।"}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Direct Food Contribution" : "সরাসরি খাবার প্রদান"}
            </h2>
            <p>
              {inEng
                ? "Donors or volunteers can deliver food or money directly to beneficiaries through our registered NGOs like BRAC, ASA, and others. Donors can choose where or to whom their assistance will go, ensuring their support has real impact."
                : "ডোনার বা স্বেচ্ছাসেবকরা আমাদের নিবন্ধিত এনজিওগুলির মাধ্যমে (যেমন BRAC, ASA, এবং অন্যান্য) সরাসরি উপকারভোগীদের কাছে খাবার বা অর্থ পৌঁছে দিতে পারেন। ডোনাররা নির্ধারণ করতে পারেন তাদের সাহায্য কার কাছে বা কোন এলাকায় যাবে।"}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Beneficiaries and Target Groups" : "উপকারভোগী এবং লক্ষ্য গোষ্ঠী"}
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>{inEng ? "Street children and underprivileged children" : "রাস্তার শিশু এবং অনগ্রসর শিশু"}</li>
              <li>{inEng ? "Day laborers and worker families" : "দিনমজুর এবং শ্রমিক পরিবারের সদস্যরা"}</li>
              <li>{inEng ? "Homeless families" : "বেকার পরিবার"}</li>
              <li>{inEng ? "Elderly people in old-age homes" : "প্রবীণরা বৃদ্ধাশ্রমে"}</li>
              <li>{inEng ? "Any hungry or impoverished individual" : "যে কোনো ক্ষুধার্ত বা দরিদ্র ব্যক্তি"}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Future Plans" : "ভবিষ্যৎ পরিকল্পনা"}
            </h2>
            <p>
              {inEng
                ? "Currently our operations are Dhaka-centric, but we plan to expand gradually. In the future, we aim not just to distribute food but also create skill-development programs for the needy, helping them become self-reliant."
                : "বর্তমানে আমাদের কার্যক্রম ঢাকায় কেন্দ্রিত, তবে ধীরে ধীরে আমরা সম্প্রসারণের পরিকল্পনা করছি। ভবিষ্যতে আমরা শুধুমাত্র খাবার বিতরণ নয়, দরিদ্রদের জন্য দক্ষতা উন্নয়নমূলক প্রোগ্রাম তৈরি করার লক্ষ্য রাখি, যাতে তারা স্বনির্ভর হতে পারে।"}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Collaboration and Volunteer Work" : "সহযোগিতা ও স্বেচ্ছাসেবক কাজ"}
            </h2>
            <p>
              {inEng
                ? "Anyone can participate as a volunteer through our platform. Volunteers can help distribute food or assist with local initiatives, becoming true partners in success."
                : "যে কেউ আমাদের প্ল্যাটফর্মের মাধ্যমে স্বেচ্ছাসেবক হিসাবে অংশগ্রহণ করতে পারেন। স্বেচ্ছাসেবকরা খাবার বিতরণ বা স্থানীয় উদ্যোগে সহায়তা করতে পারেন, সত্যিকারভাবে সফলতার অংশীদার হয়ে উঠতে।"}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {inEng ? "Concluding Remarks" : "উপসংহার"}
            </h2>
            <p>
              {inEng
                ? "Our initiative is not just about delivering food; it also raises awareness that food waste is a human responsibility. With donors, volunteers, and NGOs, we aim to build a strong foundation for food security across Bangladesh."
                : "আমাদের উদ্যোগ শুধুমাত্র খাবার পৌঁছে দেওয়ার জন্য নয়; এটি সচেতনতা বৃদ্ধি করে যে খাবার নষ্ট হওয়া মানুষের দায়িত্ব। ডোনার, স্বেচ্ছাসেবক এবং এনজিওদের সহযোগিতায় আমরা বাংলাদেশে খাদ্য নিরাপত্তার জন্য দৃঢ় ভিত্তি গড়ার লক্ষ্য রাখি।"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
