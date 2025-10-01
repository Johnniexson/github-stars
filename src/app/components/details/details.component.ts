import { Component, inject } from '@angular/core';
import { injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmDialogHeader, HlmDialogTitle } from '@spartan-ng/helm/dialog';
import { GithubRepository } from '../../types';
import { FormatNumberPipe } from "../../pipes/formatNumber/format-number.pipe";
import { CommonModule } from '@angular/common';
import { LucideAngularModule, StarIcon } from 'lucide-angular';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HlmDialogHeader, HlmDialogTitle, FormatNumberPipe, CommonModule, LucideAngularModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  // private readonly _dialogRef = inject<BrnDialogRef<GithubRepository>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ repo: GithubRepository }>();
  private readonly _repoService = inject(RepoService);

  protected readonly repo = this._dialogContext.repo;

  readonly StarIcon = StarIcon;

  hoveredStar: number | null = null;
  selectedStar: number = 0;

  public rateRepo(rating: number) {
    this.selectedStar = rating;
    this._repoService.updateRepoRating(this.repo.id, rating);
  }
}
