"use client"
import Header from "../../components/Header";
const OurTeam = () => {
    const team = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            description:
                "John has been the driving force behind our mission to reduce food waste. With a background in social entrepreneurship, he founded our organization to tackle hunger and environmental issues together.",
            image: "/person.png",
        },
        {
            name: "Jane Smith",
            role: "Operations Manager",
            description:
                "Jane ensures that our operations run smoothly from food recovery to distribution. Her attention to detail and leadership skills keep everything organized and efficient.",
            image: "/person.png",
        },
        {
            name: "Emily Brown",
            role: "Community Outreach Coordinator",
            description:
                "Emily connects with local communities, volunteers, and partners to expand our outreach efforts. She is passionate about building relationships and growing our network of supporters.",
            image: "/person.png",
        },
    ];

    return (
        <section className=" py-16 px-6 bg-gray-100 border-x-[20px] mt-[-25px] border-[#3B42D2] border-double">
            <div className="mx-auto text-center">
                <Header childern={`Meet Our Team`} />
                <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    Our dedicated team is passionate about making a difference. Here are some of the amazing individuals behind our mission:
                </p>

                <div className="backdrop-blur-sm mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-[260px] object-cover"
                            />
                            <div className="p-6 text-left">
                                <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-green-700 font-medium">{member.role}</p>
                                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTeam
