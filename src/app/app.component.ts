import { Component, inject, model, effect } from '@angular/core';
import { HouseIcon, LucideAngularModule, CircleX } from 'lucide-angular';
import { TrendingsComponent } from './components/trendings/trendings.component';
import { HlmInput } from '@spartan-ng/helm/input';
import { RepoService } from './services/repo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LucideAngularModule, HlmInput, TrendingsComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github-stars';

  private readonly _repoService = inject(RepoService);
  readonly HouseIcon = HouseIcon;
  readonly CloseIcon = CircleX;

  searchTerm = model('');

  constructor() {
    effect(() => {
      this._repoService.updateSearchTerm(this.searchTerm());
    });
  }

  clearSearchTerm() {
    this.searchTerm.set('');
  }
}
