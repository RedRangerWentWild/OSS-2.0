'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PullRequestList from '@/components/PullRequestList';
import Loader from '@/components/Loader';
import { fetchPullRequests } from '@/lib/api';
import { PullRequest } from '@/lib/types';

interface PullsPageProps {
  params: { owner: string; repo: string };
}

const PullsPage: React.FC<PullsPageProps> = ({ params }) => {
  const { owner, repo } = params;
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchData = async () => {
        try {
          const data = await fetchPullRequests(owner, repo);
          setPullRequests(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [owner, repo]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pull Requests for {repo}</h1>
      <PullRequestList pullRequests={pullRequests} />
    </div>
  );
};

export default PullsPage;