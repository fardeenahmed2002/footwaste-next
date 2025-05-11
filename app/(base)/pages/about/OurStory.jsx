import Header from "../../components/Header";
import { Dancing_Script } from "next/font/google";
const dancingscirpt = Dancing_Script({
    subsets: ['latin'],
    weight:'400'
})
const OurStory = () => {
    return (
        <section className="bg-[url('/story.png')] bg-cover bg-center bg-no-repeat mt-[-25px] py-12 px-6 bg-gray-50 border-x-[20px] border-t-[20px] border-[#3B42D2] border-double">
            <div className="backdrop-blur-sm max-w-5xl mx-auto shadow-2xl p-[20px] rounded-3xl glow-blue-border">
                <Header childern={`Our Story`} />
                <p className={`mt-6 text-2xl text-justify ${dancingscirpt.className} p-[20px] text-black`}>
                    Our story begins with a simple idea: to combat food waste while providing for those in need.
                    In the early days, we were just a small group of passionate individuals who were shocked by the amount
                    of perfectly good food being discarded in our communities while families and individuals went hungry. We
                    decided to take action, and that's how our mission was born—rescue surplus food and get it to those who need it the most.What started as a small local initiative quickly gained momentum as more people joined our cause, bringing with them
                    not only their passion for making a difference but also their expertise. Soon, we were collaborating with local farms,
                    food producers, businesses, and even other non-profits to expand our reach. We began to realize that food waste was a much
                    larger problem than we initially thought, and the need for action was greater than ever.
                </p>
                <p className={`mt-6 text-2xl text-justify ${dancingscirpt.className} p-[20px] text-black`}>
                    With each meal saved and each person fed, our vision grew. We knew that food waste and hunger weren't isolated problems—they
                    were interconnected, and the solution needed to be comprehensive. As we continued to grow, we embraced innovation, focusing
                    on sustainability and environmental responsibility. Our team expanded, and so did our partnerships with local organizations,
                    schools, and businesses, all of whom became key players in our mission to reduce food waste and feed communities.
                </p>
                <p className={`mt-6 text-2xl text-justify ${dancingscirpt.className} p-[20px] text-black`}>
                    Today, we are proud of what we've achieved, but we know the work is far from over. Our commitment remains unwavering as we strive
                    to rescue even more food, support even more communities, and reduce our environmental footprint. Every day, we are inspired by the
                    people we meet—whether they're the volunteers sorting food, the businesses donating their surplus, or the individuals whose lives
                    are changed because of our efforts. Together, we are making a lasting impact, and together, we can create a future where food waste
                    is no longer a problem, and everyone has access to the food they need to thrive.
                </p>
            </div>
        </section>
    );
}

export default OurStory
