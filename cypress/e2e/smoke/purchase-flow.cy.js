import { homePage } from '../../support/pages/homePage'
import { productPage } from '../../support/pages/productPage'
import { cartPage } from '../../support/pages/cartPage'
import { productsListRoute } from '../../support/config'

describe('Smoke', { tags: '@smoke' }, () => {
  it('logs in, finds a product, and adds it to the cart', () => {
    cy.loginAs('customer')
    homePage.navMenu().should('be.visible')

    cy.intercept(productsListRoute).as('products')
    homePage.visit()
    cy.wait('@products', { timeout: 30000 })

    homePage.productNames().first().invoke('text').then((name) => {
      const productName = name.trim()
      homePage.search(productName)
      homePage.openProductByName(productName)
      productPage.addToCart()
      homePage.goToCart()
      cartPage.productTitles().should('contain', productName)
    })
  })
})
