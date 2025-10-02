import { GithubSearchResponse } from './../../src/app/types/index';
describe('AppComponent', () => {
  it('should display header title message', () => {
    cy.visit('/');
    cy.contains('GitHub Trending Repos');
  });

  it('should call the API and render repos from fixture', () => {
    // Load fixture
    cy.fixture('response.json').then((fixture: GithubSearchResponse) => {
      const firstRepo = fixture.items[0]; // assuming fixture is an array

      // Wait for the API to be called and assert it happened
      cy.wait('@getRepos').its('response.statusCode').should('eq', 200);

      // Assert that the repos are rendered in the DOM
      cy.get('div.repo-card').should('have.length', 1);

      // Check repo names
      cy.get('div.repo-card').first().should('contain.text', firstRepo.name);
      cy.get('div.repo-card').first().should('contain.text', firstRepo.description);
      cy.get('div.repo-card').first().should('contain.text', firstRepo.owner.login);
      cy.get('div.repo-card').first().should('contain.text', 'Stars: 10K');
      cy.get('div.repo-card').first().should('contain.text', 'Issues: 10');
    });
  });

  it('should type in search input', () => {
    cy.visit('/');
    cy.get('input[aria-label="Search"]')
      .type('angular')
      .should('have.value', 'angular');
  });
});
