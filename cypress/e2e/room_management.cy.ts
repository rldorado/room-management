describe('Room Management', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the rooms of the selected floor', () => {
    cy.get('input').type('1', { force: true })
    cy.contains('Sala planta 1').should('be.visible')
  })

  it('should add a new room', () => {
    cy.contains('Añadir sala').click()
    cy.get('.v-card-title').should('contain', 'Sala planta 1')
  })

  it('should edit an existing room', () => {
    cy.contains('Sala planta 1').click()
    cy.get('input#capacity-1').clear()
    cy.get('input#capacity-1').type('30')
    cy.get('button').contains('Modificar').click()
    cy.get('.v-snackbar').should('contain', 'Sala actualizada con éxito')
  })

  it('should delete a room', () => {
    cy.contains('Sala planta 1').click()
    cy.get('button').contains('Eliminar').click()
    cy.get('.v-snackbar').should('contain', 'Sala eliminada con éxito')
    cy.contains('Sala planta 1').should('not.exist')
  })
})
