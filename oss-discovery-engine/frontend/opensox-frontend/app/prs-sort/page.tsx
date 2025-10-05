'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loader from '../../components/Loader';
import RepoCard from '../../components/RepoCard';
import { Repo } from '@/lib/types';

const PrsSortPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const perPage = searchParams.get('perPage') || '10';
  const page = searchParams.get('page') || '1';

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        const response = await fetch(`http://localhost:3001/api/github/prs-sort?q=${q}&perPage=${perPage}&page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data.items);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [q, perPage, page]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Repositories Sorted by Pull Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo: Repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default PrsSortPage;