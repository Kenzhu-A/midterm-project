import { useEffect, useState } from "react";
import SearchBar from "../components/spaces/SearchBar";
import SpaceGrid from "../components/spaces/SpaceGrid";

export default function Home() {
  const [spaces, setSpaces] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/src/data/spaces.json")
      .then((r) => r.json())
      .then(setSpaces)
      .catch((e) => console.error("Failed to load spaces:", e));
  }, []);

  const filtered = spaces.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/study-bg.jpg')", 
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/80 via-purple-800/70 to-pink-700/70"></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Study Spaces
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Find a quiet corner, a creative hub, or a 24/7 workspace across the
            Philippines.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
      </section>

      {/* Available Spaces Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4">Available Spaces:</h2>
        <div className="mb-4 text-sm text-gray-500">
          Showing {filtered.length} spaces
        </div>
        <SpaceGrid spaces={filtered} />
      </section>
    </div>
  );
}
