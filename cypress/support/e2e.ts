
beforeEach(() => {
  cy.intercept('GET', `https://api.github.com/search/repositories**`, (req) => {
    req.reply({ fixture: 'response.json' });
  }).as('getRepos');
  cy.visit('/');
});
