export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface SkillMapProps {
  topLanguages: string[];
  topTopics: string[];
  languageCounts: { [lang: string]: number };
  topicCounts: { [topic: string]: number };
}

export interface AdjacentPossibleIssue {
  title: string;
  url: string;
  repository: string;
}

export interface AdjacentPossibleListProps {
  issues: AdjacentPossibleIssue[];
}

export interface Badge {
  name: string;
  imageUrl: string;
}

export interface Milestone {
  name: string;
  description: string;
  progress: number;
  achieved: boolean;
}

export interface BadgeListProps {
  badges: Badge[];
}

export interface MilestoneListProps {
  milestones: Milestone[];
}

export interface CartographyData {
  skillMap: SkillMapProps;
  adjacentPossible: AdjacentPossibleListProps;
}

export interface GamifyData {
  username: string;
  avatar: string;
  profileUrl: string;
  contributions: {
    pullRequests: number;
    issues: number;
    commits: number;
    repos: number;
  };
  streaks: {
    currentStreak: number;
    maxStreak: number;
  };
  badges: BadgeListProps['badges'];
  milestones: MilestoneListProps['milestones'];
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface ContributorListProps {
  contributors: Contributor[];
}

export interface Issue {
  id: number;
  title: string;
  html_url: string;
  body: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
}

export interface IssueListProps {
  issues: Issue[];
}

export interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  merged_at: string | null;
}

export interface PullRequestListProps {
  pullRequests: PullRequest[];
}

export interface Release {
  id: number;
  name: string;
  tag_name: string;
  html_url: string;
  published_at: string;
  author: {
    login: string;
    avatar_url: string;
  };
}

export interface ReleaseListProps {
  releases: Release[];
}
