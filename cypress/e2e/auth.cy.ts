describe('Auth flow', () => {
  it('navigates to login page', () => {
    cy.visit('/login');
    cy.contains('Увійти').should('exist');
  });
});
