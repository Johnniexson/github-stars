import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { RepoService } from './services/repo.service';
import { mockRepo } from './services/constants';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let repoService: RepoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    repoService = TestBed.inject<RepoService>(app['_repoService'].constructor);

    // Mock the GET request made in the RepoService constructor
    const page = 1;
    const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=created:>2021-01-30&sort=stars&order=desc&page=${page}`);
    req.flush([
      mockRepo
    ]);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app-trendings component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-trendings')).toBeTruthy();
  });

  it('should clear searchTerm when clearSearchTerm is called', () => {
    app.searchTerm.set('test');
    app.clearSearchTerm();
    expect(app.searchTerm()).toBe('');
  });

  it('should update searchTerm when input changes', () => {
    repoService._allItems.set([]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[aria-label="Search"]') as HTMLInputElement;
    input.value = 'angular';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(app.searchTerm()).toBe('angular');
  });
});
