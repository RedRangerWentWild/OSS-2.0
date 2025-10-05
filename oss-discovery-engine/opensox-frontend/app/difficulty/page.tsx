import { useState, useEffect } from 'react';
import { RepoCard } from '../../components/RepoCard';
import { Loader } from '../../components/Loader';
import { apiFetch } from '../../lib/api';

const DifficultyPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/difficulty?q=${difficulty}&perPage=${perPage}&page=${page}`);
      setRepos(response.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [difficulty, perPage, page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Filter Repositories by Difficulty</h1>
      <input
        type="text"
        placeholder="Enter difficulty label"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={fetchRepos} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DifficultyPage;