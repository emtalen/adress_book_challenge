describe ('User can delete and edit contact', () => {

    before(() => {
        cy.visit('http://localhost:3001')
    })

    it ('by clicking on "Edit Contact', () => {
        cy.get('#edit-contact').click()
        cy.get('#notes').type('Changing the notes')
        cy.get('#contact-list').should('contain', 'Changing the notes')
    }) 
})