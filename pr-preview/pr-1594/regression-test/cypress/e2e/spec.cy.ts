describe('regression test', () => {
  it('open dialog subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('dialog').click()
    cy.get('button').click()
    cy.get('body').should('contain', 'Full name')
    cy.get('[class$="closeButton"]').click()
  })

  it('open alert subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('alert').click()
    cy.get('body').should('contain', 'Sample info text')
  })

  it('open breadcrumb subpage', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('breadcrumb').click()
    cy.get('body').should('contain', 'Rabbit Is Rich')
    cy.get('body').contains('The Rabbit Novels').click()
    const redirect = 'https://instructure.design'
    cy.origin(redirect, { args: { redirect } }, ({ redirect }) => {
      cy.location().should((loc) => {
        loc.href.includes(redirect)
      })
    })
  })
})
