import { Component, inject, model, effect } from '@angular/core';
import { HouseIcon, LucideAngularModule } from 'lucide-angular';
import { TrendingsComponent } from './components/trendings/trendings.component';
import { HlmInput } from '@spartan-ng/helm/input';
import { RepoService } from './services/repo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LucideAngularModule, HlmInput, TrendingsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly _repoService = inject(RepoService);
  title = 'github-stars';
  readonly HouseIcon = HouseIcon;

  searchTerm = model('');

  constructor() {
    effect(() => {
      this._repoService.updateSearchTerm(this.searchTerm());
    });
  }
}
