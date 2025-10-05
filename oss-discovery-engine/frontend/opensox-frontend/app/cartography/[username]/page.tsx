'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import SkillMap from '@/components/SkillMap';
import AdjacentPossibleList from '@/components/AdjacentPossibleList';
import { CartographyData, SkillMapProps, AdjacentPossibleListProps } from '@/lib/types';

interface CartographyPageProps {
  params: { username: string };
}

const CartographyPage: React.FC<CartographyPageProps> = ({ params }) => {
  const { username } = params;
  const [data, setData] = useState<CartographyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // Add this line to handle null data state

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contribution Cartography for {username}</h1>
      <SkillMap {...data.skillMap} />
      <AdjacentPossibleList {...data.adjacentPossible} />
    </div>
  );
};

export default CartographyPage;