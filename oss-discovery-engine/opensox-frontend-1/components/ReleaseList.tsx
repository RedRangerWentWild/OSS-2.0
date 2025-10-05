import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
}

interface ReleaseListProps {
  owner: string;
  repo: string;
}

const ReleaseList: React.FC<ReleaseListProps> = ({ owner, repo }) => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/github/project/${owner}/${repo}/releases`);
        setReleases(response.data);
      } catch (err) {
        setError('Failed to fetch releases');
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, [owner, repo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Releases</h2>
      <ul className="list-disc pl-5">
        {releases.map(release => (
          <li key={release.id} className="mb-2">
            <a href={release.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {release.name} (v{release.tag_name}) - Released on {new Date(release.published_at).toLocaleDateString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReleaseList;