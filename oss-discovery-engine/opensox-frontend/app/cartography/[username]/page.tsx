import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import SkillMap from '@/components/SkillMap';
import AdjacentPossibleList from '@/components/AdjacentPossibleList';

const CartographyPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/github/cartography/${username}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contribution Cartography for {username}</h1>
      <SkillMap skillMap={data.skillMap} />
      <AdjacentPossibleList adjacentPossible={data.adjacentPossible} />
    </div>
  );
};

export default CartographyPage;