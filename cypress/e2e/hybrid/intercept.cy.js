import { productsListRoute } from '../../support/config'
import { homePage } from '../../support/pages/homePage'
import { loginPage } from '../../support/pages/loginPage'

describe('Network intercepts', () => {
  it('waits on the login document instead of a hardcoded sleep', () => {
    cy.intercept('GET', '**/auth/login*').as('loginPage')
    loginPage.visit()
    cy.wait('@loginPage').its('response.statusCode').should('eq', 200)
    loginPage.emailInput().should('be.visible')
  })

  it('waits for the products request before asserting the catalog', () => {
    cy.intercept(productsListRoute).as('products')
    homePage.visit()
    cy.wait('@products', { timeout: 30000 }).its('response.statusCode').should('eq', 200)
    homePage.productNames().should('have.length.at.least', 1)
  })

  it('stubs an empty catalog and shows the empty state', () => {
    cy.intercept(productsListRoute, {
      statusCode: 200,
      body: {
        current_page: 1,
        data: [],
        from: null,
        last_page: 1,
        per_page: 9,
        to: null,
        total: 0,
      },
    }).as('emptyCatalog')

    homePage.visit()
    cy.wait('@emptyCatalog', { timeout: 30000 })
    homePage.productNames().should('have.length', 0)
    homePage.noResults().should('be.visible')
  })
})
