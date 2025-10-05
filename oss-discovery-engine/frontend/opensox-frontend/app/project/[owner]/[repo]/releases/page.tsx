'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import ReleaseList from '@/components/ReleaseList';
import { fetchReleases } from '@/lib/api';
import { Release } from '@/lib/types';

interface ReleasesPageProps {
  params: { owner: string; repo: string };
}

const ReleasesPage: React.FC<ReleasesPageProps> = ({ params }) => {
  const { owner, repo } = params;
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      const getReleases = async () => {
        try {
          const data = await fetchReleases(owner, repo);
          setReleases(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      getReleases();
    }
  }, [owner, repo]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Releases for {repo}</h1>
      <ReleaseList releases={releases} />
    </div>
  );
};

export default ReleasesPage;