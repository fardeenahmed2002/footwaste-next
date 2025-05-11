import { Roboto_Condensed,Parkinsans } from "next/font/google"
const robotoCondensed=Roboto_Condensed({
  subsets: ['latin'],
})
const parkinsans = Parkinsans({
  subsets: ['latin'],
});
const Introduction = () => {
  return (
    <div
        className="p-[20px] bg-cover bg-center h-[480px] w-full flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: 'url(/about.png)' }}
    >
        <h1 className={`text-6xl font-bold text-black animate-heading ${robotoCondensed.className}`}>
            Our Mission
        </h1>
        <br />
        <p className={`text-lg text-black ${parkinsans.className}`}>
            At our core, we are committed to reducing food waste, alleviating hunger, and fostering sustainability. Every year, billions of pounds of edible food are discarded while millions of people go without. Our mission is to change that. We rescue surplus food from farms, grocery stores, restaurants, manufacturers, and even from individual households—preventing it from ending up in landfills and causing unnecessary greenhouse gas emissions. This food is then repurposed and redistributed to individuals and families in need, offering them access to fresh, healthy, and nutritious meals.
            <br />

            The journey of food waste reduction begins with partnerships. We collaborate with local businesses, farms, and organizations to gather surplus food, ensuring that it doesn’t go to waste. Our trained volunteers and staff members ensure the safe handling and distribution of this food, which is carefully sorted, packaged, and delivered to community centers, food banks, shelters, and directly to individuals facing food insecurity. This process not only helps reduce food waste but also strengthens local communities and supports vulnerable populations who may otherwise go hungry.
            <br />
        </p>

        <br />
        <button className=" bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all mb-[20px]">
            Join With Us
        </button>
    </div>
)
}

export default Introduction
