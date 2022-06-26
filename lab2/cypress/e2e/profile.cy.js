describe('sign up', () => {
    it('fills all needed inputs and navigates to /sign-in', () => {
        cy.visit('http://localhost:3000/profile')
        cy.get('input[name="name"]').type('ann');
        cy.get('input[name="dateOfBirth"]').type('2000-12-12');
        cy.get('input[name="gender"]').type('Woman');

        cy.get('button').click();

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/profile')
        })
    })
})