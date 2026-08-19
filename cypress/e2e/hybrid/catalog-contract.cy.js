import { productsListRoute } from '../../support/config'
import { expectProductSchema, toolshopRequest } from '../../support/api/toolshopClient'
import { homePage } from '../../support/pages/homePage'

describe('Hybrid catalog contract', () => {
  it('shows the same product name and price in the UI as the API', { tags: '@smoke' }, () => {
    toolshopRequest('GET', '/products').then((response) => {
      expect(response.status).to.eq(200)
      const product = response.body.data[0]
      expectProductSchema(product)

      cy.intercept(productsListRoute).as('catalog')
      homePage.visit()
      cy.wait('@catalog', { timeout: 30000 }).its('response.statusCode').should('eq', 200)

      homePage.search(product.name)
      homePage.productNames().first().should('contain', product.name)
      homePage.productPrices().first().should('contain', String(product.price))
    })
  })
})
