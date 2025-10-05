import React from 'react';
import { Contributor, ContributorListProps } from '@/lib/types';

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Contributors</h2>
      <ul className="list-disc pl-5">
        {contributors.map((contributor: Contributor) => (
          <li key={contributor.login} className="flex items-center mt-2">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-medium">{contributor.login}</span>
            <span className="ml-2 text-gray-500">({contributor.contributions} contributions)</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributorList;