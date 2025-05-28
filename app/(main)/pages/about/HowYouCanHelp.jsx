"use client"
import { HandHeart, Users, Megaphone, DollarSign, Handshake, HeartHandshake } from 'lucide-react';
import Header from '../../components/Header';
const HowYouCanHelp = () => {
    return (
        <section className="bg-[url('/help.png')] bg-cover bg-center bg-no-repeat py-12 px-6 bg-[#FFF7E6] border-x-[20px] border-[#15803D] mt-[-25px] border-double">
            <div className="backdrop-blur-sm max-w-5xl mx-auto text-center">
                <Header childern={`How You Can Help`} />
                <p className="mt-4 text-lg text-black">
                    Every small effort counts. Here are a few ways you can make a difference and help us in our mission:
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <HelpCard
                        Icon={HandHeart}
                        title="Donate Food"
                        text="If you have surplus food, donate it to help feed those in need. Your donations can provide meals to hungry families, reduce food waste, and support your local community."
                    />
                    <HelpCard
                        Icon={Users}
                        title="Volunteer"
                        text="Volunteers are the heart of our organization. By volunteering your time, you’ll be directly involved in rescuing food, distributing meals, and supporting our mission in your local area."
                    />
                    <HelpCard
                        Icon={Megaphone}
                        title="Raise Awareness"
                        text="Share our cause with your friends, family, and community. The more people know about food waste, the more we can do to solve the problem. Together, we can inspire change!"
                    />
                    <HelpCard
                        Icon={DollarSign}
                        title="Make a Financial Contribution"
                        text="Monetary donations help us cover operational costs, improve our infrastructure, and expand our reach to rescue even more food. Every dollar goes towards creating a sustainable impact."
                    />
                    <HelpCard
                        Icon={Handshake}
                        title="Partner With Us"
                        text="Whether you're a local business or an organization, partner with us to rescue surplus food, reduce waste, and share meals with communities in need. Together, we can build a stronger future."
                    />
                    <HelpCard
                        Icon={HeartHandshake}
                        title="Support Our Initiatives"
                        text="Support our campaigns, events, and projects. By joining forces, we can amplify our impact, encourage others to help, and create a network of individuals working together to fight hunger."
                    />
                </div>
            </div>
        </section>
    );
}
function HelpCard({ Icon, title, text }) {
    return (
        <div className="help-option bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center mb-4 text-[#15803D]">
                <Icon size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-700 text-justify">{text}</p>
        </div>
    );
}
export default HowYouCanHelp
