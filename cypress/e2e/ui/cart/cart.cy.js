import { homePage } from '../../../support/pages/homePage'
import { productPage } from '../../../support/pages/productPage'
import { cartPage } from '../../../support/pages/cartPage'
import { productsListRoute } from '../../../support/config'

const addFirstInStockProduct = () => {
  homePage.productNames().first().invoke('text').then((name) => {
    const productName = name.trim()
    homePage.openProductByName(productName)
    productPage.addToCart()
    cy.wrap(productName).as('addedProduct')
  })
}

describe('UI cart', () => {
  beforeEach(() => {
    cy.intercept(productsListRoute).as('products')
    homePage.visit()
    cy.wait('@products', { timeout: 30000 })
  })

  it('adds a product and shows it in the cart', { tags: '@smoke' }, () => {
    addFirstInStockProduct()

    homePage.cartQuantity().should('be.visible').and('not.have.text', '')
    homePage.goToCart()
    cy.url().should('include', '/checkout')

    cy.get('@addedProduct').then((productName) => {
      cartPage.productTitles().should('contain', productName)
    })
    cartPage.proceedButton().should('be.visible')
  })

  it('returns to the catalog with Continue Shopping', () => {
    addFirstInStockProduct()
    homePage.goToCart()
    cartPage.continueShopping().click()
    homePage.productNames().should('have.length.at.least', 1)
  })
})
