import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"> Advertisements</h1>
        <p className="mt-6 text-lg md:text-xl text-white/90">Discover and explore all advertisements in one place.</p>
        <div className="mt-8">
          <Link
            href="/ads"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-black/40 rounded-2xl shadow-lg backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105">
            Open Ads
          </Link>
        </div>
      </div>
    </main>
  );
}