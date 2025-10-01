import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, untracked } from '@angular/core';
import { GithubRepository, GithubSearchResponse } from '../types';

@Injectable({
  providedIn: 'root'
})

export class RepoService {
  private http = inject(HttpClient);
  isLoading = signal(false);
  searchTerm = signal('');
  currentPage = signal(1);
  totalCount = signal(0);
  private _allItems = signal<GithubRepository[]>([]);

  public readonly items = computed(() => {
    const searchTerm = this.searchTerm();
    const filteredItems = searchTerm !== '' ? (this._allItems().filter((repo) => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))) : this._allItems();
    return filteredItems;
  });

  public readonly totalItems = computed(() => this._allItems().length);
  public readonly totalPages = computed(() => Math.ceil(this.totalCount() / 30));
  public readonly hasNextPage = computed(() => this.currentPage() < this.totalPages());

  constructor() {
    this.getTrendingRepos();
  }

  getTrendingRepos(page = 1) {
    const _hasNextPage = untracked(() => this.hasNextPage());
    if (_hasNextPage === false && page !== 1) {
      return;
    }
    this.isLoading.set(true);
    this.http.get<GithubSearchResponse>(`https://api.github.com/search/repositories?q=created:>2021-01-30&sort=stars&order=desc&page=${page}`)
      .subscribe((data) => {
        console.log(data);
        this.totalCount.set(data.total_count);
        this.currentPage.set(page);
        if (page === 1) {
          this._allItems.set(data.items);
        } else {
          this._allItems.update(items => [...items, ...data.items]);
        }

        this.isLoading.set(false);
      });
  }

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  updateRepoRating(repoId: number, rating: number) {
    this._allItems.update(items => {
      return items.map(repo => {
        if (repo.id === repoId) {
          return { ...repo, score: rating };
        }
        return repo;
      });
    });
  }

  loadMore() {
    if (this.hasNextPage()) {
      this.getTrendingRepos(this.currentPage() + 1);
    }
  }

  timeAgo(dateString: string): string {
    const createdDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  }
}
