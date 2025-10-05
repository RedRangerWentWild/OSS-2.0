import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// 1. Search repositories by query
export async function fetchReposBySearch(
  query: string,
  perPage = 20,
  page = 1
) {
  const resp = await axios.get(`${BASE_URL}/search/repositories`, {
    params: { q: query, per_page: perPage, page, sort: 'stars', order: 'desc' },
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}

// 2. Fetch details for a specific repository
export async function fetchRepoDetails(owner: string, repo: string) {
  const resp = await axios.get(`${BASE_URL}/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}

// 3. Fetch contributors for a specific repository
export async function fetchRepoContributors(owner: string, repo: string) {
  const resp = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/contributors`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}

// 4. Fetch issues for a specific repository
export async function fetchRepoIssues(
  owner: string,
  repo: string,
  state = 'open',
  perPage = 20,
  page = 1
) {
  const resp = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/issues`, {
    params: { state, per_page: perPage, page },
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}

// 5. Fetch pull requests for a specific repository
export async function fetchRepoPullRequests(
  owner: string,
  repo: string,
  state = 'open',
  perPage = 20,
  page = 1
) {
  const resp = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/pulls`, {
    params: { state, per_page: perPage, page },
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}

// 6. Fetch releases for a specific repository
export async function fetchRepoReleases(
  owner: string,
  repo: string,
  perPage = 20,
  page = 1
) {
  const resp = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/releases`, {
    params: { per_page: perPage, page },
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return resp.data;
}
