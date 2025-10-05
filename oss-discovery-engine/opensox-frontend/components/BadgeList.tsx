import React from 'react';

interface BadgeListProps {
  badges: string[];
}

const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Badges</h2>
      <ul className="list-disc list-inside">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <li key={index} className="text-gray-700">
              {badge}
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