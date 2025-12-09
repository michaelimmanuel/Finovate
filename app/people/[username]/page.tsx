"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const randomNames = [
  "Sarah Lee",
  "Alicia Gomez",
  "Kevin Brooks",
  "Nadia Perez",
  "Samuel Wright",
  "Chloe Martin",
  "Ethan Rivera",
  "Chyntia Irawan",
  "Stefanie Veronica Wijaya",
  "Domique Gabriella da Silva",
  "Alice Marybeth",
  "Daniel Ricardo H.",
  "Michael Immanuel",
];

const financeTexts = [
  "How to manage your savings effectively in 2025.",
  "Smart budgeting tricks to reduce monthly expenses.",
  "Tips for building long-term financial stability.",
  "Why emergency funds matter more than ever.",
  "Practical investment strategies for beginners.",
];

export default function PeoplePage() {
  const { username } = useParams();
  const decoded = decodeURIComponent(username as string);

  // Unique random people
  const recommendedPeople = useMemo(() => {
    // Shuffle names
    const shuffled = [...randomNames].sort(() => Math.random() - 0.5);

    // Take first 9 unique people
    return shuffled.slice(0, 9).map((name) => ({
      name,
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(
        name
      )}`,
      written: Math.floor(Math.random() * 50) + 10,
      bio: financeTexts[Math.floor(Math.random() * financeTexts.length)],
    }));
  }, []);

  const [followed, setFollowed] = useState<{ [key: string]: boolean }>({});

  const toggleFollow = (name: string) => {
    setFollowed((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="px-50 py-10">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-10">
        <div className="w-full flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
          <div>
            <div className="w-full flex-row justify-between">
              <h1 className="mb-2 text-2xl font-bold">{decoded}</h1>
              <button
                onClick={() => toggleFollow(decoded)}
                className={`mb-2 w-full px-2 py-1 rounded-full border transition ${
                  followed[decoded]
                    ? "bg-white border-yellow-500 text-yellow-600"
                    : "bg-yellow-500 border-yellow-500 text-white"
                }`}
              >
                {followed[decoded] ? "Followed" : "Follow"}
              </button>
            </div>

            <p className="text-gray-500">People You May Want to Follow</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          placeholder="Search people…"
          className="w-full px-5 py-3 border rounded-full outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {recommendedPeople.map((person) => (
          <Link
            key={person.name}
            href={`/people/${encodeURIComponent(person.name)}/detail`}
          >
            <div
              key={person.name}
              className="p-5 bg-white shadow rounded-xl border hover:shadow-lg transition"
            >
              {/* Person header */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={person.avatar}
                  className="w-12 h-12 rounded-full"
                  alt={person.name}
                />
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <span className="text-xs text-gray-500">
                    {person.written} Posts Written
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {person.bio}
              </p>

              {/* Follow */}
              <button
                onClick={() => toggleFollow(person.name)}
                className={`w-full py-2 rounded-full border transition ${
                  followed[person.name]
                    ? "bg-white border-yellow-500 text-yellow-600"
                    : "bg-yellow-500 border-yellow-500 text-white"
                }`}
              >
                {followed[person.name] ? "Followed" : "Follow"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
