import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingsComponent } from './trendings.component';
import { RepoService } from '../../services/repo.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockRepo } from '../../services/constants';

describe('TrendingsComponent', () => {
  let component: TrendingsComponent;
  let fixture: ComponentFixture<TrendingsComponent>;
  let httpMock: HttpTestingController;
  let repoService: RepoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrendingsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    repoService = TestBed.inject<RepoService>(component['_repoService'].constructor);

    // Mock the GET request made in the RepoService constructor
    const page = 1;
    const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=created:>2021-01-30&sort=stars&order=desc&page=${page}`);
    req.flush([
      mockRepo
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner when loading and no items', () => {
    repoService._allItems.set([]);
    component.isLoading.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading...');
  });

  it('should show no repositories found when not loading and no items', () => {
    repoService._allItems.set([]);
    component.isLoading.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No repositories found.');
  });

  it('should render repository cards when items are present', () => {
    repoService._allItems.set([mockRepo]);
    component.isLoading.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockRepo.name);
    expect(compiled.textContent).toContain('An awesome project');
    expect(compiled.textContent).toContain(mockRepo.owner.login);
    expect(compiled.textContent).toContain('Stars: 10K');
    expect(compiled.textContent).toContain('Issues: 10');
  });

  it('should call viewRepoDetails when a repo card is clicked', () => {
    repoService._allItems.set([mockRepo]);
    component.isLoading.set(false);
    spyOn(component, 'viewRepoDetails');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.repo-card') as HTMLElement;
    card.click();
    expect(component.viewRepoDetails).toHaveBeenCalled();
  });
});
