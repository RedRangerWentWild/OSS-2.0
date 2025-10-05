import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import {
  fetchReposBySearch,
  fetchRepoDetails,
  fetchRepoContributors,
  fetchRepoIssues,
  fetchRepoPullRequests,
  fetchRepoReleases
} from '../services/githubService';

const githubHeaders = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${process.env.GITHUB_TOKEN}`
};

const router = express.Router();

// 1. Search repositories
router.get('/search', async (req, res) => {
  try {
    const { q, perPage, page } = req.query;
    if (typeof q !== 'string' || !q.length) {
      return res.status(400).json({ error: 'Missing or invalid query parameter: q' });
    }
    const data = await fetchReposBySearch(
      q,
      Number(perPage) || 20,
      Number(page) || 1
    );
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 2. Project details endpoint with debug log
router.get('/project/:owner/:repo', async (req, res) => {
  console.log('Project details route HIT!', req.params);
  try {
    const data = await fetchRepoDetails(req.params.owner, req.params.repo);
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 3. Contributors endpoint with debug log
router.get('/project/:owner/:repo/contributors', async (req, res) => {
  console.log('Contributors route HIT!', req.params);
  try {
    const data = await fetchRepoContributors(req.params.owner, req.params.repo);
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 4. Issues endpoint
router.get('/project/:owner/:repo/issues', async (req, res) => {
  try {
    const { state, perPage, page } = req.query;
    const data = await fetchRepoIssues(
      req.params.owner,
      req.params.repo,
      typeof state === 'string' ? state : 'open',
      Number(perPage) || 20,
      Number(page) || 1
    );
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 5. Pull Requests endpoint
router.get('/project/:owner/:repo/pulls', async (req, res) => {
  try {
    const { state, perPage, page } = req.query;
    const data = await fetchRepoPullRequests(
      req.params.owner,
      req.params.repo,
      typeof state === 'string' ? state : 'open',
      Number(perPage) || 20,
      Number(page) || 1
    );
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 6. Releases endpoint
router.get('/project/:owner/:repo/releases', async (req, res) => {
  try {
    const { perPage, page } = req.query;
    const data = await fetchRepoReleases(
      req.params.owner,
      req.params.repo,
      Number(perPage) || 20,
      Number(page) || 1
    );
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 7. Good First Issue endpoint
router.get('/good-first-issue', async (req, res) => {
  const { q = '', perPage = 10, page = 1 } = req.query;
  try {
    const searchQ = [q, 'good-first-issues:>0'].filter(Boolean).join(' ');
    const data = await fetchReposBySearch(
      searchQ,
      Number(perPage),
      Number(page)
    );
    return res.json({
      total: data.total_count || (data.items ? data.items.length : 0),
      items: data.items || [],
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 8. Difficulty label filter endpoint
router.get('/difficulty', async (req, res) => {
  const { q = '', difficulty = '', perPage = 10, page = 1 } = req.query;
  try {
    const baseRepos = await fetchReposBySearch(
      String(q), Number(perPage), Number(page)
    );
    const repos = baseRepos.items || [];
    const filteredRepos: any[] = [];
    for (const repo of repos) {
      let issues: any[] = [];
      try {
        issues = await fetchRepoIssues(repo.owner.login, repo.name, 'open', 10, 1);
      } catch {
        issues = [];
      }
      const hasMatchingIssue = Array.isArray(issues) && issues.some(issue =>
        issue &&
        Array.isArray(issue.labels) &&
        issue.labels.some((label: any) =>
          label &&
          typeof label.name === 'string' &&
          label.name.toLowerCase().includes(String(difficulty).toLowerCase())
        )
      );
      if (hasMatchingIssue) {
        filteredRepos.push(repo);
      }
    }
    return res.json({
      total: filteredRepos.length,
      items: filteredRepos,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 9. Contributors sort endpoint
router.get('/contributors-sort', async (req, res) => {
  const { q = '', perPage = 10, page = 1 } = req.query;
  try {
    const baseRepos = await fetchReposBySearch(
      String(q),
      Number(perPage),
      Number(page)
    );
    const repos = baseRepos.items || [];
    const reposWithContribCounts: any[] = [];
    for (const repo of repos) {
      let contributors: any[] = [];
      try {
        contributors = await fetchRepoContributors(repo.owner.login, repo.name);
      } catch {
        contributors = [];
      }
      reposWithContribCounts.push({
        ...repo,
        _contribCount: Array.isArray(contributors) ? contributors.length : 0
      });
    }
    reposWithContribCounts.sort((a, b) => a._contribCount - b._contribCount);
    return res.json({
      total: reposWithContribCounts.length,
      items: reposWithContribCounts,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 10. Sort repositories by number of pull requests
router.get('/prs-sort', async (req, res) => {
  const { q = '', perPage = 10, page = 1 } = req.query;
  try {
    const baseRepos = await fetchReposBySearch(
      String(q), Number(perPage), Number(page)
    );
    const repos = baseRepos.items || [];
    const reposWithPRCounts: any[] = [];
    for (const repo of repos) {
      let prs: any[] = [];
      try {
        prs = await fetchRepoPullRequests(repo.owner.login, repo.name, 'all', 100, 1);
      } catch {
        prs = [];
      }
      reposWithPRCounts.push({
        ...repo,
        _prCount: Array.isArray(prs) ? prs.length : 0
      });
    }
    reposWithPRCounts.sort((a, b) => a._prCount - b._prCount);
    return res.json({
      total: reposWithPRCounts.length,
      items: reposWithPRCounts,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// Camp org arrays (GSoC, LFX, Outreachy) — unchanged

const gsocOrgs = [
  "52°North Spatial Information Research GmbH", "AboutCode", "Apache Software Foundation",
  "GNOME Foundation", "MetaBrainz Foundation", "Wikimedia Foundation", "KDE",
  "Processing Foundation", "SugarLabs", "Mozilla", "Creative Commons",
  "Drupal Association", "FOSSology", "Postman", "Bookbrainz", "Matrix", "JdeRobot",
  "CircuitVerse", "Elastic", "Rocket.Chat", "GDevelop", "OpenMRS", "Free and Open Silicon Foundation",
  "Hydra Ecosystem", "Joplin", "XWiki", "OSS-Fuzz (Google)", "Chromium", "Zulip",
  "OpenChemistry", "OpenEMR", "Nteract", "OpenCV", "Open Bioinformatics Foundation (OBF)",
  "Inclusive Design Institute", "MG-GG", "Kubeflow", "Performance Co-Pilot",
  "Submitty", "GPAC", "GraphQL Plugins", "SambaWiki", "Fossasia", "OWASP", "Salesforce",
  "Shaka Player", "JBoss Community", "GNOME Website", "OpenAstronomy", "Score Labs",
  "EOS Design Python", "Open Genome Informatics"
];
const lfxOrgs = [
  "CNCF", "Kubernetes", "Harbor", "Jaeger", "Kubescape", "KubeEdge", "Meshery",
  "TAG Network", "Vitess", "TUF", "Thanos", "Prometheus", "Litmus", "Kubespray",
  "KubeArmor", "Knative", "Crossplane", "Open Network Automation Platform (ONAP)",
  "OpenDaylight", "OPNFV", "FD.io", "OpenSSF", "Hyperledger", "Open Mainframe Project",
  "OpenTelemetry", "Longhorn", "Containerd", "etcd", "gRPC", "Linkerd", "Argo", "Flux",
  "Helm", "Chaos Mesh", "Operator Framework", "OpenYurt", "Submariner", "WasmEdge",
  "Dragonfly", "KARMADA", "Volcano", "kube-burner", "Keda", "OpenKruise", "Pixie",
  "cert-manager", "Dapr", "TARS Foundation", "Rook", "OpenKubetest", "OpenMetrics"
];
const outreachyOrgs = [
  "GNOME Foundation", "Wikimedia Foundation", "Linux Kernel", "Mozilla",
  "Creative Commons", "Python Software Foundation", "OpenStack", "Debian Project",
  "Fedora Project", "LibreOffice", "WordPress", "Django", "QEMU", "FreeBSD",
  "GIMP", "Tor Project", "Blender Foundation", "OpenStreetMap", "Humanitarian OpenStreetMap Team",
  "Matplotlib", "Jenkins", "KaTeX", "OpenAstronomy", "Project Jupyter", "Node.js",
  "GStreamer", "Open Bioinformatics Foundation", "Rails Girls Summer of Code", "Zulip",
  "MetaBrainz Foundation", "Open Library", "Open Collective", "Score Labs", "XWiki",
  "Datum project", "Outreachy Data Project", "Twisted", "Open Science Grid",
  "Open Humans Foundation", "Postman", "OpenMRS", "Rocket.Chat", "KDE",
  "Processing Foundation", "SambaWiki", "JBOSS Community", "Dataverse", "GCompris",
  "Fossasia", "OSGeo"
];

// 11. Filter/search repositories by org camp participation (GSoC, LFX, Outreachy)
router.get('/camp-org', async (req, res) => {
  const { q = '', camp = '', perPage = 10, page = 1 } = req.query;
  try {
    const baseRepos = await fetchReposBySearch(
      String(q), Number(perPage), Number(page)
    );
    let repos = baseRepos.items || [];
    let campOrgs: string[] = [];
    if (camp === 'gsoc') campOrgs = gsocOrgs;
    else if (camp === 'lfx') campOrgs = lfxOrgs;
    else if (camp === 'outreachy') campOrgs = outreachyOrgs;
    if (campOrgs.length > 0) {
      const campOrgsLower = campOrgs.map(org => org.toLowerCase());
      repos = repos.filter((repo: any) => {
        const ownerLogin = (repo.owner?.login || '').toLowerCase();
        const orgLogin = (repo.organization?.login || '').toLowerCase?.() || '';
        const orgName = (repo.organization?.name || '').toLowerCase?.() || '';
        const ownerName = (repo.owner?.name || '').toLowerCase?.() || '';
        return (
          campOrgsLower.includes(ownerLogin) ||
          campOrgsLower.includes(orgLogin) ||
          campOrgsLower.includes(orgName) ||
          campOrgsLower.includes(ownerName)
        );
      });
    }
    return res.json({ total: repos.length, items: repos });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 12. Contribution Cartography
router.get('/cartography/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userReposResp = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers: githubHeaders }
    );
    const userRepos = userReposResp.data;
    const languageCounts: { [lang: string]: number } = {};
    const topicCounts: { [topic: string]: number } = {};
    for (const repo of userRepos) {
      if (repo.language) languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      if (Array.isArray(repo.topics)) {
        for (const topic of repo.topics) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      }
    }
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1]).slice(0, 3).map(([lang]) => lang);
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1]).slice(0, 5).map(([topic]) => topic);

    const qParts = [
      topLanguages.length ? `language:${topLanguages[0]}` : "",
      "state:open",
      "archived:false",
      "label:good-first-issue label:help-wanted"
    ].filter(Boolean);
    const issuesResp = await axios.get(
      `https://api.github.com/search/issues?q=${encodeURIComponent(qParts.join(' '))}&per_page=10`,
      { headers: githubHeaders }
    );
    const adjacentIssues = issuesResp.data.items || [];
    res.json({
      skillMap: { topLanguages, topTopics, languageCounts, topicCounts },
      adjacentPossible: adjacentIssues
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// 14. Gamified Dashboard: Tracks contributions, streaks, badges, milestones
router.get('/gamify/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userResp = await axios.get(`https://api.github.com/users/${username}`, {
      headers: githubHeaders
    });
    const user = userResp.data;
    const eventsResp = await axios.get(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: githubHeaders
    });
    const events = eventsResp.data;
    const datesWithEvents: string[] = Array.from(new Set(events.map((ev: any) =>
      new Date(ev.created_at).toISOString().slice(0, 10)
    )));
    datesWithEvents.sort(); // chronological
    let currentStreak = 1;
    let maxStreak = 1;
    for (let i = 1; i < datesWithEvents.length; i++) {
      const prevDate = new Date(String(datesWithEvents[i - 1]));
      const currDate = new Date(String(datesWithEvents[i]));
      if ((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24) === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    let numPRs = 0, numIssues = 0, numCommits = 0, numRepos = user.public_repos;
    for (const ev of events) {
      if (ev.type === "PullRequestEvent") numPRs++;
      if (ev.type === "IssuesEvent") numIssues++;
      if (ev.type === "PushEvent") numCommits += ev.payload.commits ? ev.payload.commits.length : 0;
    }
    const badges = [];
    if (numPRs >= 10) badges.push("PR Hero");
    if (numIssues >= 10) badges.push("Issue Resolver");
    if (maxStreak >= 5) badges.push("Streak Surfer");
    if (numCommits >= 100) badges.push("Commit Machine");
    if (numRepos >= 20) badges.push("Repo Collector");
    res.json({
      username: user.login,
      avatar: user.avatar_url,
      profileUrl: user.html_url,
      contributions: {
        pullRequests: numPRs,
        issues: numIssues,
        commits: numCommits,
        repos: numRepos
      },
      streaks: {
        currentStreak,
        maxStreak
      },
      badges,
      milestones: {
        firstPR: numPRs >= 1,
        tenPRs: numPRs >= 10,
        fiftyCommits: numCommits >= 50,
        hundredCommits: numCommits >= 100,
        fiveDayStreak: maxStreak >= 5,
        twentyRepos: numRepos >= 20
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Unknown error" });
  }
});

// THIS LINE IS CRITICAL, DO NOT REMOVE!
export default router;
