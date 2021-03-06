describe ('user can create a contact', () => {
    beforeEach('test', () => { 
        cy.visit('http://localhost:3001')
        cy.get('#add-contact').click()
        cy.get('#name').type('Emma')
        cy.get('#email').type('emma@mail.com')
        cy.get('#phone').type('070 1234567')
        cy.get('#company').type('Craf Academy')
        cy.get('#notes').type('Struggling noob coder')
        cy.get('#twitter').type('@emma')
        cy.get('#submit').click()

    })
    beforeEach('displays a name of a new contact', () => {
        cy.get('#contact-list').should('contain', 'Thomas')
    })
    beforeEach('displays a phone number of the new contact', () => {
        cy.get('#contact-list').should('contain', '0700 101010')
    })
})