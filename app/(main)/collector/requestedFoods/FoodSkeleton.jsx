"use client"

const FoodSkeleton = () => {
    return (
        <div
            className="bg-[#1c2333] rounded-lg shadow overflow-hidden flex flex-col animate-pulse"
            style={{ width: "300px", height: "300px" }}
        >
         
            <div className="h-[40%] w-full bg-[#2a324a]" />


            <div className="p-2 flex-1 flex flex-col justify-between h-[60%]">
                <div>
                    <div className="h-4 bg-[#2a324a] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#2a324a] rounded w-full mb-1" />
                    <div className="h-3 bg-[#2a324a] rounded w-5/6" />
                </div>
                <div className="text-xs mt-3 space-y-2">
                    <div className="h-3 bg-[#2a324a] rounded w-2/4" />
                    <div className="h-3 bg-[#2a324a] rounded w-3/4" />
                    <div className="h-3 bg-[#2a324a] rounded w-1/2" />
                    <div className="h-5 bg-[#2a324a] rounded w-1/3 mt-3" />
                </div>
            </div>
        </div>
    )
}

export default FoodSkeleton
