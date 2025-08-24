"use client"

const FoodDetailsSkeleton = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto animate-pulse">
            <div className="flex flex-col md:flex-row gap-[50px]">
                {/* Map Section */}
                <div className="w-full md:w-1/2 space-y-2">
                    <div className="h-10 bg-[#2a324a] rounded" />
                    <div className="h-10 bg-[#2a324a] rounded" />
                    <div className="h-[400px] bg-[#2a324a] rounded-xl" />
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {/* Image */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Food Image */}
                        <div className="md:w-1/2">
                            <div className="w-full h-[200px] bg-[#2a324a] rounded-lg" />
                        </div>

                    </div>

                    {/* Food Details */}
                    <div className="space-y-3">
                        <div className="h-6 w-1/2 bg-[#2a324a] rounded" />
                        <div className="h-4 w-1/3 bg-[#2a324a] rounded" />
                        <div className="h-4 w-5/6 bg-[#2a324a] rounded" />
                        <div className="h-4 w-4/6 bg-[#2a324a] rounded" />
                        <div className="h-4 w-2/3 bg-[#2a324a] rounded" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <div className="h-10 w-24 bg-[#2a324a] rounded" />
                        <div className="h-10 w-24 bg-[#2a324a] rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetailsSkeleton
