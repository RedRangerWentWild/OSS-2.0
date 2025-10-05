import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import RepoCard from '../../components/RepoCard';

const PrsSortPage = () => {
  const router = useRouter();
  const { q = '', perPage = '10', page = '1' } = router.query;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:3001/api/github/prs-sort?q=${q}&perPage=${perPage}&page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data.items);
      } catch (err) {
        setError(err.message);
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
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default PrsSortPage;