describe ('user can create a contact', () => {
    it('test', () => { 
        cy.visit('http://localhost:3001')
        cy.get('#add-contact').click()
        cy.get('#name').type('Thomas')
        cy.get('#email').type('thomas@craft.se')
        cy.get('#phone').type('0700 101010')
        cy.get('#company').type('Craf Academy')
        cy.get('#notes').type('Awesome coder')
        cy.get('#twitter').type('@thomasochman')
        cy.get('#submit').click()

    })
    it('displays a name of a new contact', () => {
        cy.get('#contact-list').should('contain', 'Thomas')
    })
    it('displays a phone number of the new contact', () => {
        cy.get('#contact-list').should('contain', '0700 101010')
    })
})