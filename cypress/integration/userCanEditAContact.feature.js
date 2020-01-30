describe ('update a contact', () => {
    before(() => {
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
    it('by changing data and saving it', () => {
        cy.get('#update-button').click()
        cy.get('#new-contact-form').within(() => {
            cy.get('#name').clear().type('Daniel')
            cy.get('#email').clear().type('daniel@mail.com')
            cy.get('#submit').click()
        })
    })
})