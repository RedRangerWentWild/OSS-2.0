import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContributorList from '@/components/ContributorList';
import Loader from '@/components/Loader';
import { fetchContributors } from '@/lib/api';

const ContributorsPage = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (owner && repo) {
      const getContributors = async () => {
        try {
          const data = await fetchContributors(owner, repo);
          setContributors(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getContributors();
    }
  }, [owner, repo]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contributors for {repo}</h1>
      <ContributorList contributors={contributors} />
    </div>
  );
};

export default ContributorsPage;