import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { RepoService } from '../../services/repo.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { mockRepo } from '../../services/constants';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let httpMock: HttpTestingController;
  let repoService: RepoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DIALOG_DATA, useValue: { repo: mockRepo } },
        {
          provide: BrnDialogRef,
          useValue: jasmine.createSpyObj('BrnDialogRef', ['close', 'setAriaLabelledBy']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
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

  it('should render repository details', () => {
    repoService._allItems.set([mockRepo]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockRepo.name);
    expect(compiled.textContent).toContain(mockRepo.description || 'No description available');
    expect(compiled.textContent).toContain(mockRepo.owner.login);
    expect(compiled.textContent).toContain('Stars: 10K');
    expect(compiled.textContent).toContain('Issues: 10');
  });

  it('should update selectedStar when rateRepo is called', () => {
    repoService._allItems.set([mockRepo]);
    component.selectedStar = 0;
    fixture.detectChanges();
    component.rateRepo(4);
    expect(component.selectedStar).toBe(4);
    const repo = repoService._allItems().find(r => r.id === mockRepo.id);
    expect(repo?.score).toBe(4);
  });

  it('should handle missing description gracefully', () => {
    repoService._allItems.set([mockRepo]);
    Object.defineProperty(component, 'repo', {
      value: { ...mockRepo, description: '' },
      writable: false
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No description available');
  });
});
