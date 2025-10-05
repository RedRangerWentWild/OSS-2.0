import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import ReleaseList from '@/components/ReleaseList';
import { fetchReleases } from '@/lib/api';

const ReleasesPage = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (owner && repo) {
      const getReleases = async () => {
        try {
          const data = await fetchReleases(owner, repo);
          setReleases(data);
        } catch (err) {
          setError(err.message);
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