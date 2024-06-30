describe('Room Management', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('h1').contains('Salas').should('be.visible')
  })

  it('displays rooms and allows floor selection', () => {
    cy.get('select').should('exist')

    cy.get('select').select('2')

    cy.get('.bg-blue-light').should('exist')
  })

  it('allows adding a new room', () => {
    cy.get('.loader').should('not.exist') // Waits up to 10 seconds for the loader to disappear

    let initialLength: number

    cy.get('.bg-blue-light').then(($elemsBefore) => {
      initialLength = $elemsBefore.length
      cy.contains('button', 'Añadir sala').click()
    })

    cy.get('.bg-blue-light', { timeout: 10000 }).should(($elemsAfter) => {
      expect($elemsAfter.length).to.eq(initialLength + 1)
    })
  })

  it('allows editing a room', () => {
    cy.get('.bg-blue-light').first().as('firstRoom')

    cy.get('@firstRoom').then((firstRoom) => {
      cy.wrap(firstRoom).find('input').first().clear()
    })
    cy.get('@firstRoom').find('input').first().type('50')

    cy.get('@firstRoom').contains('button', 'Modificar').click()

    cy.contains('Sala actualizada con exito').should('be.visible')
  })

  it('allows deleting a room', () => {
    cy.get('.bg-blue-light')
      .its('length')
      .then((initialLength) => {
        cy.get('.bg-blue-light').first().contains('button', 'Eliminar').click()

        cy.get('.bg-blue-light').should('have.length', initialLength - 1)

        cy.contains('Sala eliminada con exito').should('be.visible')
      })
  })

  it('validates input fields', () => {
    cy.get('.bg-blue-light').first().as('firstRoom')

    cy.get('@firstRoom').then((firstRoom) => {
      cy.wrap(firstRoom).find('input').first().clear()
    })
    cy.get('@firstRoom').find('input').first().type('-10')

    cy.get('@firstRoom').contains('button', 'Modificar').click()

    cy.get('@firstRoom').contains('Debe ser positivo').should('be.visible')

    cy.contains('Sala actualizada con exito').should('not.exist')
  })
})
