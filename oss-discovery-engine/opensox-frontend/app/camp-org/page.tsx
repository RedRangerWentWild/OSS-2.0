import { useEffect, useState } from 'react';
import CampOrgFilter from '@/components/CampOrgFilter';
import RepoCard from '@/components/RepoCard';
import Loader from '@/components/Loader';
import { fetchCampOrgRepos } from '@/lib/api';

const CampOrgPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [camp, setCamp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCampOrgRepos(query, camp);
        setRepos(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, camp]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Camp Organization Repositories</h1>
      <CampOrgFilter setQuery={setQuery} setCamp={setCamp} />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default CampOrgPage;