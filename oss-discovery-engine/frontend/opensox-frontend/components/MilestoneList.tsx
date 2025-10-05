import React from 'react';
import { Milestone, MilestoneListProps } from '@/lib/types';

const MilestoneList: React.FC<MilestoneListProps> = ({ milestones }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Milestones</h2>
      <ul className="list-disc pl-5">
        {milestones.map((milestone: Milestone, index) => (
          <li key={index} className={milestone.achieved ? 'text-green-600' : 'text-red-600'}>
            {milestone.name} {milestone.achieved ? '✔️' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MilestoneList;