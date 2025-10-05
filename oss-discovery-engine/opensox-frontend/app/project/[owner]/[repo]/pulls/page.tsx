import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PullRequestList from '@/components/PullRequestList';
import Loader from '@/components/Loader';
import { fetchPullRequests } from '@/lib/api';

const PullsPage = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchData = async () => {
        try {
          const data = await fetchPullRequests(owner, repo);
          setPullRequests(data);
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Pull Requests for {repo}</h1>
      <PullRequestList pullRequests={pullRequests} />
    </div>
  );
};

export default PullsPage;