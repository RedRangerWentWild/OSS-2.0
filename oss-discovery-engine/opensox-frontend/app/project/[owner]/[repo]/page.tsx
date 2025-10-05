import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import RepoCard from '@/components/RepoCard';
import { fetchRepoDetails } from '@/lib/api';

const RepoPage = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchData = async () => {
        try {
          const data = await fetchRepoDetails(owner, repo);
          setRepoData(data);
        } catch (err) {
          setError(err.message);
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
    <div className="p-4">
      {repoData ? (
        <RepoCard repo={repoData} />
      ) : (
        <div>No repository data found.</div>
      )}
    </div>
  );
};

export default RepoPage;