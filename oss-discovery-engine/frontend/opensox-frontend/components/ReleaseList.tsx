import React from 'react';
import { Release, ReleaseListProps } from '@/lib/types';

const ReleaseList: React.FC<ReleaseListProps> = ({ releases }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Releases</h2>
      <ul className="list-disc pl-5">
        {releases.map((release: Release) => (
          <li key={release.id} className="mb-2">
            <a href={release.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {release.name} (v{release.tag_name}) - Released on {new Date(release.published_at).toLocaleDateString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReleaseList;