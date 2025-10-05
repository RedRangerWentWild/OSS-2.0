import React from 'react';
import { AdjacentPossibleListProps } from '@/lib/types';

const AdjacentPossibleList: React.FC<AdjacentPossibleListProps> = ({ issues }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Adjacent Possible Issues</h2>
      <ul className="list-disc pl-5">
        {issues.map((issue, index) => (
          <li key={index} className="mt-2">
            <a href={issue.url} className="text-blue-500 hover:underline">
              {issue.title}
            </a> in <strong>{issue.repository}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdjacentPossibleList;