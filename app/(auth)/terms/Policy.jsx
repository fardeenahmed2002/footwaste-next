export const loginPolicyBN = [
    "লগইন করতে পারবে: User, Admin, NGO / Organization।",
    "প্রতিটি ব্যবহারকারীকে অবশ্যই ভ্যালিড অ্যাকাউন্ট থাকতে হবে।",
    "লগইনের জন্য ইমেইল কোড যাচাই বাধ্যতামূলক।",
    "শুধুমাত্র ভেরিফাইড ইমেইল সহ ব্যবহারকারী লগইন করতে পারবে।",
    "ভেরিফিকেশন কোড ব্যবহারকারীর ইমেইলে পাঠানো হবে।",
    "ব্যবহারকারীর পাসওয়ার্ড এনক্রিপ্টেডভাবে সংরক্ষণ করা হবে।",
    "পাসওয়ার্ড কাউকে দেখানো হবে না এবং কেবল ব্যবহারকারী নিজের জন্য ব্যবহার করতে পারবে।",
    "পাসওয়ার্ড রিকভারি বা পুনঃসেট সিস্টেম থাকবে নিরাপত্তা নিশ্চিত করার জন্য।",
    "Admin: সমস্ত কার্যক্রম পর্যবেক্ষণ এবং পরিচালনার অনুমতি থাকবে।",
    "User: কেবল তাদের নিজস্ব ডোনেশন, কার্যক্রম এবং প্রোফাইল দেখতে পারবে।",
    "NGO / Organization: তাদের সংগঠন সম্পর্কিত কার্যক্রম এবং ডোনেশন ট্র্যাক করতে পারবে।",
    "ব্যবহারকারীর লগইন সেশন নিরাপদ থাকবে।",
    "দীর্ঘ সময়ের নিষ্ক্রিয়তার পরে স্বয়ংক্রিয় লগআউট হবে।",
    "একাধিক ডিভাইস থেকে একই অ্যাকাউন্ট লগইন করলে সতর্কবার্তা প্রদর্শিত হবে।"
];


export const signupPolicyBN = [
    "সাইনআপ করতে পারবে: Donor User, Collector NGO, Organization, Individual Volunteer, Charity Group।",
    "প্রতিটি নতুন ব্যবহারকারীকে তাদের পরিচয় এবং প্রয়োজনীয় তথ্য প্রদান করতে হবে।",
    "সাইনআপের সময় ইমেইল কোড যাচাই বাধ্যতামূলক।",
    "ব্যবহারকারী তাদের ভেরিফাইড ইমেইল দিয়ে অ্যাকাউন্ট সক্রিয় করতে হবে।",
    "NGO / Organization: তাদের প্রতিষ্ঠানের লোগো আপলোড করতে হবে।",
    "User / Volunteer: তাদের নিজস্ব ছবি আপলোড করতে হবে।",
    "প্রয়োজনীয় ছবি / লোগো ছাড়া অ্যাকাউন্ট তৈরি হবে না।",
    "সাইনআপের সময় সংগৃহীত তথ্য শুধুমাত্র প্রশাসনিক ব্যবস্থাপনা এবং কার্যক্রমের জন্য ব্যবহার হবে।",
    "ব্যবহারকারীরা নিজের তথ্য আপডেট করতে পারবে না।",
    "Donor User: দান, কার্যক্রমে অংশগ্রহণ এবং নিজের প্রোফাইল পরিচালনা করতে পারবে।",
    "Collector NGO / Organization: তাদের সংগঠন সম্পর্কিত কার্যক্রম পরিচালনা এবং ডোনেশন সংগ্রহ ও বিতরণ করতে পারবে।",
    "Individual Volunteer / Charity Group: স্বেচ্ছাসেবক কার্যক্রম, ডেটা সংগ্রহ এবং সচেতনতা প্রচারণায় অংশ নিতে পারবে।",
    "সকল সাইনআপ তথ্য এনক্রিপ্টেডভাবে সংরক্ষিত থাকবে।",
    "সাইনআপ প্রক্রিয়ায় অস্বাভাবিক বা সন্দেহজনক কার্যক্রম দেখা দিলে প্রশাসক যাচাই করবে।"
];

export const loginPolicy = [
    "Login access is available to: User, Admin, NGO / Organization.",
    "Every user must have a valid account.",
    "Email code verification is mandatory for login.",
    "Only users with a verified email can log in.",
    "User passwords will be stored in encrypted form.",
    "Admin: Has permission to monitor and manage all activities.",
    "User: Can only view their own donations, activities, and profile.",
    "NGO / Organization: Can track activities and donations related to their organization.",
    "User login sessions will remain secure.",
    "Automatic logout will occur after extended inactivity.",
    "If the same account is logged in from multiple devices, a warning will be displayed."
];

export const signupPolicy = [
    "Signup access is available to: Donor User, Collector NGO, Organization, Individual Volunteer, Charity Group.",
    "Each new user must provide their identity and required information.",
    "Email code verification is mandatory during signup.",
    "NGO / Organization: Must upload their organization logo.",
    "User / Volunteer: Must upload their personal photo.",
    "Accounts cannot be created without the required photo or logo.",
    "Information collected during signup will be used only for administrative management and activities.",
    "Users cannot update their own information.",
    "Donor User: Can make donations, participate in activities, and manage their profile.",
    "Collector NGO / Organization: Can manage their organization’s activities, collect and distribute donations.",
    "Individual Volunteer / Charity Group: Can participate in volunteer activities, collect data, and take part in awareness campaigns.",
    "All signup information will be encrypted and securely stored.",
    "Any unusual or suspicious activity during signup will be verified by the administrators."
];