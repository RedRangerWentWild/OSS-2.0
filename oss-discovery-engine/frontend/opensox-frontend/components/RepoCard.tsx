import React from 'react';
import { Repo } from '@/lib/types';

export interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const { name, owner, description, html_url, stargazers_count } = repo;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold">
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {name}
        </a>
      </h2>
      <p className="text-gray-700">{description}</p>
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>Owner: {owner.login}</span>
        <span>⭐ {stargazers_count}</span>
      </div>
    </div>
  );
};

export default RepoCard;