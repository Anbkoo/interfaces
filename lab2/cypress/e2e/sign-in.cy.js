describe('sign in', () => {
    it('fills all needed inputs and navigates to /blog', () => {
        cy.visit('http://localhost:3000/sign-in')
        cy.get('input[name="email"]').type('email@email.com');
        cy.get('input[name="password"]').type('password');

        cy.get('button').click();

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/blog')
        })
    })
})