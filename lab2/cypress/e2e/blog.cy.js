describe('blog', () => {
    it('creates post', () => {
        cy.visit('http://localhost:3000/blog')

        cy.get('button').contains('Add Post').click();

        cy.get('input[name="title"]').type('post title');
        cy.get('input[name="description"]').type('post description');

        cy.get('button').contains('Add post').click()

        cy.get('.h5').contains('post title').should('exist')


    })
    it('creates comment', () => {
        cy.get('input[placeholder="Leave your comment"]').type('some comment')

        cy.get('button').contains('Send').click();
        cy.get('.card-text').contains('some comment').should('exist')
    })

    it('deletes comment', () => {
        cy.get('button[data-testid="delete-comment"]').click()
        cy.get('.card-text').contains('some comment').should('not.exist')
    })

    it('deletes post', () => {
        cy.get('button[data-testid="delete-post"]').click()
        cy.get('.h5').should('not.exist');
    })
})