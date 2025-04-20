describe('Private Chat Functionality', () => {
  beforeEach(() => {
    localStorage.setItem('chatUser', 'user');
    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ3aW50ZXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1MTEyNjUyfQ.CNKAdyvonIwkcJj9EMu-FdyrFtVnAAMl8txKDgRr6dU');
    localStorage.setItem('userRole', 'user');

    cy.visit('http://localhost:4200/chat');
  });

  it('should switch to private chat and send a message', () => {
    const privateUser = 'winter'; 
    const message = 'Hello from Cypress in private chat!';

    cy.contains(privateUser).click();

    cy.get('textarea').type(message);
    cy.get('button').contains('Send').click();

    cy.contains(message).should('exist');
  });

  it('should upload a file in private chat and display its name', () => {
    const privateUser = 'summer';
    const fileName = 'testFile.txt';

    cy.contains(privateUser).click();

    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type="file"]').selectFile({
        contents: Cypress.Blob.binaryStringToBlob(fileContent),
        fileName,
        mimeType: 'text/plain',
        lastModified: Date.now(),
      });

      cy.contains(fileName).should('exist');
    });
  });
});
