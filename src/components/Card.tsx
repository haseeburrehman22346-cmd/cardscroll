"use client"
import useCard from "@/Hooks/usecard";
import Image from "next/image";
const Card = () => {
    const { visibleData, loading, hasMore, loaderRef } = useCard();
    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">All Ads</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {visibleData.map((item) => (
                    <article key={item.id} className="group relative border rounded-2xl shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
                        <Image src={item.image} alt={item.title} className="w-full h-48 object-cover" width={100} height={100} />
                        <div className="p-5 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">{item.title}</h3>
                                <span className="ml-3 shrink-0 px-2.5 py-0.5 text-xs font-medium bg-gray-50 border rounded-full text-gray-600">{item.condition}</span>
                            </div>
                            <p className="text-sm text-gray-500">{item.location}</p>
                            <p className="text-indigo-600 font-bold text-lg">Rs&nbsp;{item.price.toLocaleString()}</p>
                        </div>
                    </article>
                ))}
            </section>
            <div ref={loaderRef} className="col-span-full text-center py-10 mt-4 border-t border-gray-100">
                {visibleData.length > 0 && loading ? (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>):!hasMore?(
                    <p className="text-gray-400 font-bold text-lg">No more data</p>):
                    <div className="h-10"></div>}
            </div>
        </main>
    );
};
export default Card;