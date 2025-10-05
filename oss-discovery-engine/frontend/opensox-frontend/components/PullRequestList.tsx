import React from 'react';
import { PullRequest, PullRequestListProps } from '@/lib/types';

const PullRequestList: React.FC<PullRequestListProps> = ({ pullRequests }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Pull Requests</h2>
      {pullRequests.length === 0 ? (
        <p>No pull requests found.</p>
      ) : (
        <ul className="space-y-4">
          {pullRequests.map((pr: PullRequest) => (
            <li key={pr.id} className="border p-4 rounded shadow">
              <div className="flex items-center">
                <img src={pr.user.avatar_url} alt={pr.user.login} className="w-8 h-8 rounded-full mr-2" />
                <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {pr.title}
                </a>
              </div>
              <p className="text-gray-500 text-sm">Opened by {pr.user.login} on {new Date(pr.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PullRequestList;