'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import RepoCard from '@/components/RepoCard';
import { fetchRepoDetails } from '@/lib/api';
import { Repo } from '@/lib/types';

interface RepoPageProps {
  params: { owner: string; repo: string };
}

const RepoPage: React.FC<RepoPageProps> = ({ params }) => {
  const { owner, repo } = params;
  const [repoData, setRepoData] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchData = async () => {
        try {
          const data = await fetchRepoDetails(owner, repo);
          setRepoData(data);
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
  if (!repoData) return <div>No repository data found.</div>; // Add null check for repoData

  return (
    <div className="p-4">
      <RepoCard repo={repoData} />
    </div>
  );
};

export default RepoPage;