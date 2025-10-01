export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}

export interface GithubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  pushed_at: string;  // ISO date
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: GithubLicense | null;
  default_branch: string;
  score: number;
}

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

export interface GithubLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
  node_id: string;
}
