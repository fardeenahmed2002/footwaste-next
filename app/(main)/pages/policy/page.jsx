"use client"

import { Context } from "@/app/contextapi/ContextProvider";
import { useContext, useState } from "react";
import Header from "../../components/Header";

const PolicyPage = () => {
  const { inEng } = useContext(Context)
  const [openIndex, setOpenIndex] = useState(null)

  const policyBN = [
    {
      title: "১. শিক্ষা ও সচেতনতা বৃদ্ধি",
      text: `আমাদের সংগঠন শুধুমাত্র খাদ্য বিতরণে সীমাবদ্ধ নয়; আমরা চাই সমাজে সচেতনতা তৈরি করতে। শিক্ষামূলক কার্যক্রমের মাধ্যমে আমরা মানুষকে খাবার অপচয় রোধ এবং দুর্বল জনগোষ্ঠীর প্রতি সহায়তার গুরুত্ব বোঝাব। শিশু, যুবক এবং বড় সবাইকে শিক্ষা দেওয়া হবে খাদ্য সংরক্ষণ, স্বাস্থ্যসম্মত খাবারের গুরুত্ব, এবং পরিমিত খাওয়ার অভ্যাস সম্পর্কে। সচেতনতা বৃদ্ধি করতে আমরা স্থানীয় স্কুল, কলেজ, কমিউনিটি সেন্টার, এবং শ্রমিক বস্তি সহ বিভিন্ন স্থানে সেমিনার, ওয়ার্কশপ, এবং ইন্টারেক্টিভ কার্যক্রম চালাব। এছাড়া সামাজিক যোগাযোগ মাধ্যম ও অনলাইন প্ল্যাটফর্ম ব্যবহার করে ভিডিও, পোস্টার, এবং শিক্ষামূলক গল্পের মাধ্যমে বার্তা পৌঁছে দেব। স্বেচ্ছাসেবকরা এই কার্যক্রমে গুরুত্বপূর্ণ ভূমিকা রাখবে। তারা স্থানীয় জনগোষ্ঠীর সাথে সরাসরি কাজ করবে, তাদেরকে খাদ্য নিরাপত্তা এবং স্বাস্থ্য সম্পর্কে গাইড করবে। প্রতিটি সচেতনতা কার্যক্রমের শেষে ছোট পরীক্ষা বা ফিডব্যাক নেওয়া হবে, যাতে কার্যক্রমের কার্যকারিতা মূল্যায়ন করা যায়। আমাদের লক্ষ্য কেবল খাদ্য বিতরণ নয়, বরং একটি সচেতন সমাজ গঠন যেখানে মানুষ নিজে থেকে খাদ্য অপচয় কমায় এবং দুর্বলদের সহায়তার জন্য উদগ্রীব হয়। ভবিষ্যতে, কাজের বিনিময়ে খাদ্য প্রদান কার্যক্রমও এই শিক্ষামূলক নীতির সাথে সংযুক্ত করা হবে, যাতে মানুষের দক্ষতা বৃদ্ধি পায় এবং তারা স্বনির্ভর হতে পারে।`
    },
    {
      title: "২. ডেটা সংগ্রহ ও ব্যবহার নীতি",
      text: `সংগঠনটি কার্যক্রমের স্বচ্ছতা এবং প্রভাব বিশ্লেষণের জন্য ডেটা সংগ্রহ করবে। আমাদের ডেটা নীতি তিন স্তরের হবে: 
১. অ্যাননিমাস ডেটা: যারা নিজের পরিচয় গোপন রাখতে চায়, তারা সীমিত তথ্য দিয়ে অনলাইনে বা অফলাইনে দান করতে পারবে। এ ধরনের ডেটা শুধুমাত্র পরিসংখ্যান এবং কার্যক্রমের পর্যালোচনার জন্য ব্যবহার হবে। 
২. সাধারণ ডেটা: যারা নাম, ইমেইল বা ফোন নম্বর প্রদান করে দান করবে, তাদের তথ্য সংরক্ষণ করা হবে যোগাযোগ এবং কার্যক্রমের আপডেটের জন্য। 
৩. আপডেটেড পূর্ণ ডেটা: যারা সম্পূর্ণ রেজিস্ট্রেশন করবে, তারা নিয়মিত তাদের ডেটা আপডেট করতে পারবে। প্রশাসকরা কার্যক্রম পর্যবেক্ষণ, বিতরণ এবং ডোনেশন ট্র্যাকিংয়ের জন্য ব্যবহার করবে। ব্যবহারকারীরা তাদের নিজস্ব প্রোফাইলে ডেটা দেখতে পারবে, তবে অন্য ব্যবহারকারীর তথ্য কখনো দেখার সুযোগ থাকবে না। প্রশাসকরা পুরো কার্যক্রমের তথ্য পর্যবেক্ষণ করবে। ডেটা নিরাপত্তা অত্যন্ত গুরুত্বপূর্ণ। আমরা আধুনিক সাইবার নিরাপত্তা ব্যবস্থা গ্রহণ করব, যাতে কোনো ডেটা চুরি বা অননুমোদিত ব্যবহার না হয়।`
    },
    {
      title: "৩. সুবিধাভোগী এবং লক্ষ্য জনগোষ্ঠীর তথ্য ও গোপনীয়তা নীতি",
      text: `আমাদের সংগঠন যেসব মানুষকে খাদ্য বিতরণ করবে, তাদের গোপনীয়তা এবং ব্যক্তিগত তথ্যের সুরক্ষা সবচেয়ে গুরুত্বপূর্ণ। সুবিধাভোগীদের নাম, ঠিকানা বা যোগাযোগের তথ্য কখনো প্রকাশ করা হবে না। এই তথ্য শুধুমাত্র প্রশাসনিক ব্যবস্থাপনা এবং কার্যক্রমের জন্য ব্যবহৃত হবে। কোনো সাধারণ ব্যবহারকারী বা স্বেচ্ছাসেবক এই তথ্য সরাসরি দেখতে বা জানার সুযোগ পাবে না। প্রতিটি কার্যক্রমের রিপোর্ট এবং পরিসংখ্যান প্রকাশ করা হবে সামগ্রিক আকারে। প্রশাসকরা এই তথ্য পরিচালনা করবে এবং পর্যবেক্ষণ করবে। এই নীতি নিশ্চিত করবে যে, সুবিধাভোগীরা সম্মানজনকভাবে সাহায্য পায় এবং তাদের ব্যক্তিগত তথ্য ঝুঁকির মধ্যে থাকে না। একটি নির্দিষ্ট অভিযোগ ব্যবস্থা থাকবে। সুবিধাভোগী বা স্বেচ্ছাসেবীরা অনায়াসে সমস্যার কথা জানাতে পারবে, এবং প্রশাসকরা দ্রুত সমাধান করবে।`
    },
    {
      title: "৪. স্বেচ্ছাসেবক নিয়োগ ও প্রশিক্ষণ নীতি",
      text: `সংগঠনের কার্যক্রম কার্যকরভাবে চালাতে, স্বেচ্ছাসেবকরা মূল ভিত্তি। আমরা বিভিন্ন কার্যক্রমের জন্য স্বেচ্ছাসেবক নিয়োগ করব। প্রতিটি কার্যক্রমে ১০ জন স্বেচ্ছাসেবীর জন্য একজন প্রধান স্বেচ্ছাসেবক থাকবে, যিনি পুরো দলের তদারকি করবেন। প্রধান স্বেচ্ছাসেবক তাদের কাজের নির্দেশনা দেবেন এবং নতুন স্বেচ্ছাসেবকদের প্রশিক্ষণ দেবেন। প্রশিক্ষণ কর্মসূচিতে শিখানো হবে: কীভাবে খাবার সংগ্রহ ও সংরক্ষণ করতে হবে, কীভাবে সুবিধাভোগীর কাছে খাবার বিতরণ করতে হবে, স্বেচ্ছাসেবীদের নিরাপত্তা এবং আচরণবিধি, কার্যক্রমের স্বচ্ছতা নিশ্চিত করার জন্য ডেটা নথিভুক্তকরণ। প্রশিক্ষণ শেষে স্বেচ্ছাসেবকরা শুধু খাবার বিতরণ নয়, সচেতনতা কার্যক্রমেও অংশগ্রহণ করবে। ভবিষ্যতে কাজের বিনিময়ে খাদ্য বা অন্যান্য সহায়তা দেওয়ার ব্যবস্থা করা হবে।`
    },
    {
      title: "৫. দান ব্যবস্থাপনা ও অনুদান গ্রহণ নীতি",
      text: `সংগঠন সম্পূর্ণ স্বচ্ছভাবে দান গ্রহণ ও পরিচালনা করবে। যে কোনো ব্যক্তি বা প্রতিষ্ঠান অনলাইনের মাধ্যমে বা অফলাইনে দান করতে পারবে। দানের ধরণ হবে: নগদ অর্থ, ব্যাংক ট্রান্সফার, ক্রেডিট/ডেবিট কার্ড, খাবার বা অন্যান্য প্রয়োজনীয় সামগ্রী। দানকারী চাইলে সম্পূর্ণ অনামিকভাবে দান করতে পারবে। অনামিক দানের ক্ষেত্রে আমরা ব্যক্তিগত তথ্য সংরক্ষণ করব না। যারা দানের রসিদ বা নথিপত্র চাইবেন, তাদের তথ্য সুরক্ষিতভাবে সংরক্ষণ করা হবে। একটি ট্র্যাকিং সিস্টেম নিশ্চিত করবে যে দানকৃত খাদ্য বা অর্থ সঠিকভাবে বিতরণ হচ্ছে। প্রতিটি অনুদান কার্যক্রমের রিপোর্ট সংরক্ষণ করা হবে।`
    },
    {
      title: "৬. খাদ্য সংগ্রহ, সংরক্ষণ এবং বিতরণ নীতি",
      text: `খাবারের মান, সুরক্ষা এবং পুষ্টিগুণ আমাদের সবচেয়ে বড় অগ্রাধিকার। সংগঠন শুধুমাত্র স্বাস্থ্যসম্মত, তাজা এবং নিরাপদ খাবার গ্রহণ করবে। খাদ্য সংগ্রহের সময় এর উৎপত্তি, প্রক্রিয়াকরণ, মেয়াদ শেষ হওয়ার তারিখ, এবং সংরক্ষণের যোগ্যতা পরীক্ষা করা হবে। কোনো খাবার যদি স্বাস্থ্যসম্মত না হয়, তা বিতরণ করা হবে না। সংগঠন একটি উন্নত ফ্রিজ ও সংরক্ষণ ব্যবস্থা তৈরি করবে। প্রাপ্ত খাবার যত দ্রুত সম্ভব সুবিধাভোগীর কাছে পৌঁছে দেওয়া হবে। স্বেচ্ছাসেবকরা খাবারের গুণমান পরীক্ষা করার জন্য প্রশিক্ষিত থাকবে। খাদ্য বিতরণে সময়নিষ্ঠা নিশ্চিত করতে প্রতিটি স্বেচ্ছাসেবককে নির্দেশ দেওয়া হবে যে, খাবার রান্না বা প্রস্তুতির ৬–১০ ঘণ্টার মধ্যে বিতরণ করতে হবে।`
    },
    {
      title: "৭. সচেতনতা প্রচারণা ও সম্প্রদায় অংশগ্রহণ নীতি",
      text: `খাদ্য বিতরণ ও ক্ষুধার্ত মানুষের সহায়তার পাশাপাশি, সচেতনতা প্রচারণা আমাদের মূল লক্ষ্য। স্বেচ্ছাসেবকরা স্থানীয় সম্প্রদায়ে শিক্ষামূলক কার্যক্রম চালাবে। এই প্রচারণায় অন্তর্ভুক্ত থাকবে: খাবার অপচয় রোধের উপায়, নিরাপদ ও স্বাস্থ্যসম্মত খাবারের সংরক্ষণ, দরিদ্র ও সুবিধাবঞ্চিতদের প্রতি সহানুভূতি ও সামাজিক দায়বদ্ধতা। বিভিন্ন মাধ্যম ব্যবহার করা হবে: সোশ্যাল মিডিয়া, স্থানীয় মিটিং, স্কুল-কলেজ, বাজার এবং কমিউনিটি সেন্টারে পোস্টার, ফ্লায়ার ও ভিডিও বিতরণ।`
    },
    {
      title: "৮. স্বেচ্ছাসেবক এবং স্কিল ভিত্তিক কর্মসূচি নীতি",
      text: `সংগঠন স্বেচ্ছাসেবকদের দক্ষতা ও আগ্রহের ভিত্তিতে বিভিন্ন কাজের দায়িত্ব ভাগ করবে। প্রতিটি স্বেচ্ছাসেবককে তার দক্ষতার অনুযায়ী কাজ দেওয়া হবে, যেমন: খাদ্য প্রস্তুতি, বিতরণ, ডেটা সংগ্রহ, সচেতনতা প্রচারণা বা প্রশাসনিক সহায়তা। প্রশিক্ষণ অন্তর্ভুক্ত থাকবে: নিরাপদ ও স্বাস্থ্যসম্মত খাবারের নিয়ম, কার্যক্রমের নথিপত্র তৈরি, সুবিধাভোগীদের সাথে সম্মানজনক আচরণ, এবং ডেটা সংরক্ষণ ও রিপোর্টিং। স্কিল-বেসড ইনসেনটিভ সিস্টেম থাকবে।`
    },
    {
      title: "৯. প্রশাসন, মনিটরিং এবং স্বচ্ছতা নীতি",
      text: `সংগঠনের প্রতিটি কার্যক্রম স্বচ্ছ ও মনিটরিং সাপেক্ষে পরিচালিত হবে। প্রশাসনিক বোর্ড নিশ্চিত করবে যে: দান, খাদ্য সংগ্রহ, সংরক্ষণ, বিতরণ, এবং স্বেচ্ছাসেবকদের কার্যক্রম সবই সঠিকভাবে চলছে। প্রতিটি দানের রিপোর্ট, খাবারের গুণমান যাচাই এবং বিতরণ কার্যক্রম ডিজিটালভাবে নথিভুক্ত করা হবে। সুবিধাভোগীদের ব্যক্তিগত তথ্য কখনও প্রকাশ করা হবে না। নিয়মিত ফিডব্যাক সিস্টেম থাকবে। মাসিক বা প্রয়োজনীয় সময়ে ওভারভিউ রিপোর্ট প্রকাশ করা হবে। এই নীতি নিশ্চিত করবে যে সংগঠন কার্যকরী, স্বচ্ছ, নির্ভরযোগ্য এবং দায়বদ্ধ।`
    }
  ];


  const policyEN = [
    {
      title: "1. Education and Awareness Enhancement",
      text: `Our organization is not limited to food distribution; we aim to create awareness in society. Through educational activities, we will help people understand the importance of reducing food waste and supporting vulnerable communities. Children, youth, and adults will all receive guidance on food preservation, the significance of nutritious meals, and moderation. We will conduct seminars, workshops, and interactive sessions in schools, colleges, community centers, and labor settlements. Social media and online platforms will also be used to share videos, posters, and educational stories. Volunteers play a key role in these activities, guiding communities about food security and health. Feedback and assessments will ensure the effectiveness of the programs. In the future, work-for-food programs will be integrated to develop skills and self-reliance.`
    },
    {
      title: "2. Data Collection and Usage Policy",
      text: `The organization will collect data to ensure transparency and assess impact. Our data policy operates on three levels: Anonymous Data, Standard Data, and Full Updated Data. Anonymous Data is limited information for those who wish to remain unidentified, used only for statistics and program evaluation. Standard Data includes names, emails, and phone numbers for communication and updates. Full Updated Data allows registered users to regularly update their data for administrators to track donations, distributions, and activities. Users can view their own data, but others’ data is restricted. Modern cybersecurity measures will protect all data.`
    },
    {
      title: "3. Beneficiary and Target Population Privacy Policy",
      text: `Protecting the privacy and personal information of beneficiaries is paramount. Names, addresses, or contact details will never be disclosed and are only used for administration and program implementation. Program reports will be published in aggregate, showing overall distributions and participation without revealing individual identities. Administrators monitor all processes. A dedicated complaint mechanism will address any privacy or security concerns, ensuring beneficiaries and volunteers can report issues safely.`
    },
    {
      title: "4. Volunteer Recruitment and Training Policy",
      text: `Volunteers are the backbone of the organization. They will be recruited for various activities, with one lead volunteer overseeing each group of ten. Training programs include safe food collection, proper distribution, safety, conduct guidelines, and data documentation. Volunteers will participate in awareness campaigns and local education programs. In the future, volunteers may receive food or other support in exchange for work, promoting engagement and long-term relationships. This policy ensures organized, transparent, and safe operations.`
    },
    {
      title: "5. Donation Management and Acceptance Policy",
      text: `Donations are managed transparently. Individuals or institutions can donate online or offline via cash, bank transfer, credit/debit card, or food. Donors may choose to remain anonymous, in which case personal data is not stored. For receipts, donor data is stored securely. Tracking systems ensure that donations are distributed properly via volunteers or partner NGOs. Detailed reports document donations, distributions, and participating organizations while maintaining beneficiary confidentiality. Donors can directly contact administrators for questions or complaints.`
    },
    {
      title: "6. Food Collection, Storage, and Distribution Policy",
      text: `Food quality and safety are top priorities. Only fresh, safe, and nutritious food is accepted. Collection includes checking origin, processing, expiration date, and suitability. Advanced refrigeration and storage systems ensure food safety. Volunteers are trained to monitor quality, and food is delivered promptly. Food must be distributed within 6-10 hours of preparation; freezing or other preservation may be used for later distribution. Administrators and lead volunteers verify quality before distribution. Unsafe food is discarded.`
    },
    {
      title: "7. Awareness Campaign and Community Engagement Policy",
      text: `Alongside food distribution, awareness campaigns are essential. Volunteers educate communities on reducing food waste, safe food storage, and social responsibility toward the poor and disadvantaged. Methods include social media, local meetings, schools, posters, and flyers. Participants’ information is recorded without revealing personal details. Community members are encouraged to volunteer for distribution and campaigns, creating long-term positive change.`
    },
    {
      title: "8. Volunteer and Skill-Based Program Policy",
      text: `Volunteers are assigned tasks based on skills and interests, including food preparation, distribution, data collection, awareness campaigns, and administrative support. Training ensures safe handling, respectful interactions, documentation, and reporting. A skill-based incentive system rewards excellence, providing greater responsibilities and opportunities in larger projects. Volunteers can also conduct small community programs to spread awareness. Contributions are documented and formally recognized.`
    },
    {
      title: "9. Administration, Monitoring, and Transparency Policy",
      text: `All activities are monitored for transparency. The administrative board ensures proper management of donations, food collection, storage, distribution, and volunteer activities. Donation reports, food quality checks, and distribution records are digitally maintained. Beneficiary information remains confidential. Regular feedback ensures quality and timely delivery. Corrective actions are taken as needed. Periodic reports summarize total donations, distributions, and participating NGOs or volunteers. This ensures the organization is effective, transparent, reliable, and accountable, maintaining trust among donors, volunteers, and beneficiaries.`
    }
  ];


  const policies = inEng ? policyEN : policyBN;

  const togglePolicy = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 sm:px-12 bg-[#FFF7E6] border-y-[10px] border-x-[10px] border-[#2171b5] mt-[-25px]">
      <div className="max-w-5xl mx-auto">
        <Header title={inEng ? "Our Policies" : "আমাদের নীতি"} />

        <div className="mt-8 space-y-6">
          {policies.map((policy, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                className="w-full text-left p-5 flex justify-between items-center text-lg sm:text-xl font-semibold text-gray-800 hover:bg-gray-100 transition"
                onClick={() => togglePolicy(idx)}
              >
                {policy.title}
                <span className={`transform transition-transform ${openIndex === idx ? "rotate-180" : ""}`}>
                  &#9660;
                </span>
              </button>
              {openIndex === idx && (
                <p className="p-5 pt-0 text-gray-700 text-justify border-t border-gray-200">{policy.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolicyPage;
