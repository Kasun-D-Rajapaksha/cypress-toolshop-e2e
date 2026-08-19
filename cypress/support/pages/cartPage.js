class CartPage {
  productTitles() {
    return cy.get('[data-test="product-title"]')
  }

  productQuantities() {
    return cy.get('[data-test="product-quantity"]')
  }

  proceedButton() {
    return cy.get('[data-test="proceed-1"]')
  }

  continueShopping() {
    return cy.get('[data-test="continue-shopping"]')
  }

  cartTotal() {
    return cy.get('[data-test="cart-total"]')
  }

  visit() {
    cy.visit('/checkout')
  }
}

export const cartPage = new CartPage()
