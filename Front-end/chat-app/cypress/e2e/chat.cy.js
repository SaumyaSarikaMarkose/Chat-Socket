describe('Group Chat Message', () => {
    beforeEach(() => {
      localStorage.setItem('chatUser', 'user');
      localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1MDgxMzI2fQ.63n5c7YNTSfuyPb-SWXVVDekAq155vQzW_NGRVmrBEM');
      localStorage.setItem('userRole', 'user');
      cy.visit('http://localhost:4200/chat');
    });
  
    it('should send a group message and display it in chat', () => {
      const message = 'Hello group from Cypress!';

      cy.get('[data-cy="message-input"]').should('have.length', 1).type(message);
      cy.get('[data-cy="send-button"]').click();
  
      cy.contains(message).should('exist');
    });
  });
  