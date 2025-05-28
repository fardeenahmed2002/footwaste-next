"use client"
import Header from "../../components/Header.jsx"
import "./style.css"

const Tips = () => {
    return (
        <>
            <div className="bg-[#fff7e6] py-12 border-x-[20px] mt-[-25px] border-[#15803D] border-double">
                <Header childern={`Food Waste Reduction Tips`}/>
                <p className="text-center text-lg text-gray-600 mb-12">
                    Simple, practical steps to help you reduce food waste at home and make a positive impact.
                </p>
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll gap-8 px-6">
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/1.jpeg" alt="Plan Your Meals" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">1. Plan Your Meals</h3>
                            <p className="text-gray-600">
                                Avoid overbuying and ensure you use everything in your pantry by planning meals ahead.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/2.jpeg" alt="Store Food Properly" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">2. Store Food Properly</h3>
                            <p className="text-gray-600">
                                Proper storage can extend the shelf life of fresh foods and reduce spoilage.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/2.jpeg" alt="Use Leftovers Creatively" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">3. Use Leftovers Creatively</h3>
                            <p className="text-gray-600">
                                Transform leftover meals into new dishes to minimize waste and save money.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/4.jpeg" alt="Compost Scraps" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">4. Compost Scraps</h3>
                            <p className="text-gray-600">
                                Turn food scraps into nutrient-rich compost to reduce landfill waste and nourish your garden.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/5.jpeg" alt="Serve Correct Portions" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">5. Serve Correct Portions</h3>
                            <p className="text-gray-600">
                                Serving smaller portions helps avoid food leftovers. You can always go back for seconds!
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/6.jpeg" alt="Understand Expiration Dates" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">6. Understand Expiration Dates</h3>
                            <p className="text-gray-600">
                                Use “Best Before” and “Use By” dates as a guide to avoid throwing away food too early.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/7.jpeg" alt="Buy in Bulk" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">7. Buy in Bulk</h3>
                            <p className="text-gray-600">
                                Purchase larger quantities of non-perishable items to reduce packaging waste and save money.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/8.jpeg" alt="Donate Extra Food" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">8. Donate Extra Food</h3>
                            <p className="text-gray-600">
                                If you have extra food you can’t use, donate it to local food banks or shelters.
                            </p>
                        </div>
                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/9.jpeg" alt="Freeze Food" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">9. Freeze Food</h3>
                            <p className="text-gray-600">
                                Freeze surplus food to preserve it for later use, helping to avoid waste.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/10.jpeg" alt="Make Leftover Soups" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">10. Make Leftover Soups</h3>
                            <p className="text-gray-600">
                                Repurpose leftover vegetables, meats, and grains to make hearty soups and stews.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/use-stale-bread.jpeg" alt="Use Stale Bread" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">11. Use Stale Bread</h3>
                            <p className="text-gray-600">
                                Turn stale bread into croutons, breadcrumbs, or bread pudding instead of throwing it away.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/ripen-fruits.jpeg" alt="Ripen Fruits" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">12. Ripen Fruits</h3>
                            <p className="text-gray-600">
                                Help unripe fruits ripen by placing them in a paper bag or next to other ripe fruits.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/portion-control.jpeg" alt="Portion Control" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">13. Practice Portion Control</h3>
                            <p className="text-gray-600">
                                Start with smaller portions and save leftovers for another meal to prevent over-serving.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/fresh-herbs.jpeg" alt="Grow Fresh Herbs" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">14. Grow Fresh Herbs</h3>
                            <p className="text-gray-600">
                                Grow your own herbs at home to avoid buying excess that might go to waste.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/proper-thawing.jpeg" alt="Properly Thaw Food" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">15. Properly Thaw Food</h3>
                            <p className="text-gray-600">
                                Always thaw food safely by placing it in the fridge or using the microwave to avoid spoilage.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/use-peels.jpeg" alt="Use Peels" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">16. Use Peels</h3>
                            <p className="text-gray-600">
                                Use vegetable and fruit peels for making compost or as ingredients in smoothies and soups.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/one-pot-meals.jpeg" alt="Cook One-Pot Meals" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">17. Cook One-Pot Meals</h3>
                            <p className="text-gray-600">
                                Prepare meals that use a variety of ingredients together to reduce leftover items.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/pickling.jpeg" alt="Pickle Excess Vegetables" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">18. Pickle Excess Vegetables</h3>
                            <p className="text-gray-600">
                                Pickle extra vegetables before they spoil to preserve them for longer use.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/use-bone-broth.jpeg" alt="Make Bone Broth" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">19. Make Bone Broth</h3>
                            <p className="text-gray-600">
                                Use leftover bones and scraps to create a nutritious and flavorful broth.
                            </p>
                        </div>

                        <div className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="/refrigerate-leftovers.jpeg" alt="Refrigerate Leftovers Immediately" className="w-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">20. Refrigerate Leftovers Immediately</h3>
                            <p className="text-gray-600">
                                Store leftover food properly within two hours to avoid bacterial growth and extend freshness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tips
