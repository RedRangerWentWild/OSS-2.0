import React from 'react';
import { Issue, IssueListProps } from '@/lib/types';

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <div className="space-y-4">
      {issues.map((issue: Issue) => (
        <div key={issue.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">{issue.title}</h3>
          <p className="text-sm text-gray-600">Opened by {issue.user.login} on {new Date(issue.created_at).toLocaleDateString()}</p>
          <p className="mt-2">{issue.body}</p>
          <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${issue.state === 'open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default IssueList;