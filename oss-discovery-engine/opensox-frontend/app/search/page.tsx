import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import RepoCard from '@/components/RepoCard';
import Loader from '@/components/Loader';
import { fetchReposBySearch } from '@/lib/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchReposBySearch(query);
      setRepos(data.items);
    } catch (err) {
      setError('Failed to fetch repositories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Repositories</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;