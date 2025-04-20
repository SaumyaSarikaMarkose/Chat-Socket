describe('Login Page', () => {
    it('should log in with valid credentials', () => {
      cy.visit('http://localhost:4200/login');
  
      cy.get('input[formControlName="email"]').type('user@gmail.com');
      cy.get('input[formControlName="password"]').type('user');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/chat');
    });
  });
  