
const Skeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
            <div className="w-full h-48 bg-gray-200" />

            <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
                <div className="h-9 w-full bg-gray-300 rounded-full" />
            </div>
        </div>
    )
}

export default Skeleton
