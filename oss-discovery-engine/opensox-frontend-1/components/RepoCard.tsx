import React from 'react';

interface RepoCardProps {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  issues: number;
  pulls: number;
  url: string;
}

const RepoCard: React.FC<RepoCardProps> = ({ name, owner, description, stars, forks, issues, pulls, url }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {name}
        </a>
      </h2>
      <p className="text-gray-700">{description}</p>
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>Owner: {owner}</span>
        <span>⭐ {stars} | 🍴 {forks} | 🐛 {issues} | 🔄 {pulls}</span>
      </div>
    </div>
  );
};

export default RepoCard;