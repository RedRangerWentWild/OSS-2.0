import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Open Source Discovery</h1>
      <p className="text-lg mb-4">Explore and contribute to open-source projects.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/search" className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
          Search Repositories
        </Link>
        <Link href="/good-first-issue" className="p-4 bg-green-500 text-white rounded shadow hover:bg-green-600">
          Good First Issues
        </Link>
        <Link href="/difficulty" className="p-4 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600">
          Filter by Difficulty
        </Link>
        <Link href="/contributors-sort" className="p-4 bg-purple-500 text-white rounded shadow hover:bg-purple-600">
          Sort by Contributors
        </Link>
        <Link href="/prs-sort" className="p-4 bg-red-500 text-white rounded shadow hover:bg-red-600">
          Sort by Pull Requests
        </Link>
        <Link href="/camp-org" className="p-4 bg-teal-500 text-white rounded shadow hover:bg-teal-600">
          Camp Organization Filter
        </Link>
        <Link href="/cartography" className="p-4 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600">
          Contribution Cartography
        </Link>
        <Link href="/gamify" className="p-4 bg-pink-500 text-white rounded shadow hover:bg-pink-600">
          Gamified Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;