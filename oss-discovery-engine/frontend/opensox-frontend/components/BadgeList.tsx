import React from 'react';
import { Badge, BadgeListProps } from '@/lib/types';

const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Badges</h2>
      <ul className="list-disc list-inside">
        {badges.length > 0 ? (
          badges.map((badge: Badge, index) => (
            <li key={index} className="text-gray-700">
              {badge.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No badges earned yet.</li>
        )}
      </ul>
    </div>
  );
};

export default BadgeList;