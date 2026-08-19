import { homePage } from '../../../support/pages/homePage'
import { productPage } from '../../../support/pages/productPage'
import { productsListRoute } from '../../../support/config'
import { toolshopRequest, expectProductSchema } from '../../../support/api/toolshopClient'

describe('UI catalog', () => {
  beforeEach(() => {
    cy.intercept(productsListRoute).as('products')
    homePage.visit()
    cy.wait('@products', { timeout: 30000 })
  })

  it('lists products on the home page', { tags: '@smoke' }, () => {
    homePage.productNames().should('have.length.at.least', 1)
    homePage.productPrices().should('have.length.at.least', 1)
  })

  it('searches for a product returned by the API', () => {
    toolshopRequest('GET', '/products').then((response) => {
      const product = response.body.data[0]
      expectProductSchema(product)

      homePage.search(product.name)
      homePage.productNames().first().should('contain', product.name)
    })
  })

  it('sorts products by name A to Z', () => {
    cy.intercept(productsListRoute).as('sortedCatalog')
    homePage.sortBy('name,asc')
    cy.wait('@sortedCatalog', { timeout: 30000 })

    homePage.productNames().should('have.length.at.least', 2)
    homePage.productNames().then(($els) => {
      const names = [...$els].map((el) => el.innerText.trim())
      const expected = [...names].sort((a, b) => a.localeCompare(b))
      expect(names).to.deep.equal(expected)
    })
  })

  it('opens a product details page', () => {
    homePage.productNames().first().invoke('text').then((name) => {
      homePage.productNames().first().click()
      productPage.name().should('contain', name.trim())
      productPage.unitPrice().should('be.visible')
      productPage.addToCartButton().should('be.visible')
    })
  })
})
