import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { GithubRepository } from '../../types';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { DetailsComponent } from '../details/details.component';
import { RepoService } from '../../services/repo.service';
import { FormatNumberPipe } from "../../pipes/formatNumber/format-number.pipe";
import { LucideAngularModule, StarIcon } from 'lucide-angular';
@Component({
  selector: 'app-trendings',
  standalone: true,
  imports: [CommonModule, FormatNumberPipe, LucideAngularModule],
  templateUrl: './trendings.component.html',
  styleUrl: './trendings.component.css'
})
export class TrendingsComponent implements AfterViewInit {
  @ViewChild('anchor', { static: false }) anchor!: ElementRef<HTMLElement>;
  private observer!: IntersectionObserver;

  readonly StarIcon = StarIcon;
  private readonly _hlmDialogService = inject(HlmDialogService);
  private readonly _repoService = inject(RepoService);
  isLoading = this._repoService.isLoading;
  items = this._repoService.items;
  hasNextPage = this._repoService.hasNextPage;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoading() && this.hasNextPage()) {
        console.log('loading more items...');
        this.loadMore();
      }
    });
    this.observer.observe(this.anchor.nativeElement);
  }

  public viewRepoDetails(repo: GithubRepository) {
    const dialogRef = this._hlmDialogService.open(DetailsComponent, {
      context: {
        repo: repo,
      },
      contentClass: 'sm:!max-w-[750px] min-w-[50vw] max-h-[80vh] px-0',
    });

    dialogRef.closed$.subscribe((repo) => {
      if (repo) {
        console.log('viewed repo:', repo);
      }
    });
  }

  formatRepoInfo(repo: GithubRepository): string {
    const submitted = this._repoService.timeAgo(repo.created_at);
    return `Submitted ${submitted} by ${repo.owner.login}`;
  }

  loadMore() {
    this._repoService.loadMore();
  }
}
