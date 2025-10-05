import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import IssueList from '@/components/IssueList';

const IssuesPage = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError(err.message);
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