'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import IssueList from '@/components/IssueList';
import { Issue } from '@/lib/types';

interface IssuesPageProps {
  params: { owner: string; repo: string };
}

const IssuesPage: React.FC<IssuesPageProps> = ({ params }) => {
  const { owner, repo } = params;
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchIssues = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/github/project/${owner}/${repo}/issues`);
          if (!response.ok) {
            throw new Error('Failed to fetch issues');
          }
          const data = await response.json();
          setIssues(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchIssues();
    }
  }, [owner, repo]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Issues for {repo}</h1>
      <IssueList issues={issues} />
    </div>
  );
};

export default IssuesPage;