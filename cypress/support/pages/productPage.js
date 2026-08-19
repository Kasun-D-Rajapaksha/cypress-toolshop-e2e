class ProductPage {
  name() {
    return cy.get('[data-test="product-name"]')
  }

  unitPrice() {
    return cy.get('[data-test="unit-price"]')
  }

  addToCartButton() {
    return cy.get('[data-test="add-to-cart"]')
  }

  quantity() {
    return cy.get('[data-test="quantity"]')
  }

  addToCart() {
    this.addToCartButton().click()
  }
}

export const productPage = new ProductPage()
