'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../../../components/Loader';
import BadgeList from '../../../components/BadgeList';
import MilestoneList from '../../../components/MilestoneList';

import { GamifyData, BadgeListProps, MilestoneListProps } from '@/lib/types';

interface GamifyPageProps {
  params: { username: string };
}

const GamifyPage: React.FC<GamifyPageProps> = ({ params }) => {
  const { username } = params;
  const [data, setData] = useState<GamifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/github/gamify/${username}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // Add null check for data

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{data.username}'s Gamified Dashboard</h1>
      <img src={data.avatar} alt={`${data.username}'s avatar`} className="rounded-full w-24 h-24" />
      <a href={data.profileUrl} className="text-blue-500 underline">View Profile</a>
      <div className="mt-4">
        <h2 className="text-xl">Contributions</h2>
        <p>Pull Requests: {data.contributions.pullRequests}</p>
        <p>Issues: {data.contributions.issues}</p>
        <p>Commits: {data.contributions.commits}</p>
        <p>Repositories: {data.contributions.repos}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Streaks</h2>
        <p>Current Streak: {data.streaks.currentStreak}</p>
        <p>Max Streak: {data.streaks.maxStreak}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Badges</h2>
        <BadgeList badges={data.badges} />
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Milestones</h2>
        <MilestoneList milestones={data.milestones} />
      </div>
    </div>
  );
};

export default GamifyPage;