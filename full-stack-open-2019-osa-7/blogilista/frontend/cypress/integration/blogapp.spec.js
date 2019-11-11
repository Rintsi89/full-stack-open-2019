describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.get('[data-cy=log-in]').contains('Log in to application')
  })

  it('logging in works', function() {
    cy.get('[data-cy=username]').type('mluukkai')
    cy.get('[data-cy=password]').type('salainen')
    cy.get('[data-cy=log-in-form]').submit()
    cy.get('[data-cy=header-title]').contains('Magnificent Blogging Site')
  })
})

describe('After loggin in', function() {

  it('new blog can be created', function() {
    cy.get('[data-cy=blog-link]').click()
    cy.get('[data-cy=blog-title]').type('Uusi blogi')
    cy.get('[data-cy=blog-author]').type('Ville')
    cy.get('[data-cy=blog-url]').type('www.google.fi')
    cy.get('[data-cy=blog-form]').submit()
    cy.get('[data-cy=new-blog-title]').contains('Uusi blogi')
    cy.get('[data-cy=new-blog-author]').contains('Ville')
    cy.get('[data-cy=new-blog-likes]').contains('0')
  })

  it('blog can be liked', function() {
    cy.get('[data-cy=new-blog-link]').click()
    cy.get('[data-cy=blog-likes]').contains('0')
    cy.get('[data-cy=blog-like-button]').dblclick()
    cy.get('[data-cy=blog-likes]').contains('2')
  })

  it('user is logged out', function() {
    cy.get('[data-cy=log-out-button]').click()
    cy.get('[data-cy=log-in]').contains('Log in to application')
  })
})
