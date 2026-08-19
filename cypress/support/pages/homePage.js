class HomePage {
  searchInput() {
    return cy.get('[data-test="search-query"]')
  }

  searchSubmit() {
    return cy.get('[data-test="search-submit"]')
  }

  sortDropdown() {
    return cy.get('[data-test="sort"]')
  }

  productNames() {
    return cy.get('[data-test="product-name"]')
  }

  productPrices() {
    return cy.get('[data-test="product-price"]')
  }

  noResults() {
    return cy.get('[data-test="no-results"]')
  }

  signInLink() {
    return cy.get('[data-test="nav-sign-in"]')
  }

  navMenu() {
    return cy.get('[data-test="nav-menu"]')
  }

  cartLink() {
    return cy.get('[data-test="nav-cart"]')
  }

  cartQuantity() {
    return cy.get('[data-test="cart-quantity"]')
  }

  visit() {
    cy.visit('/')
  }

  search(query) {
    this.searchInput().clear().type(query)
    this.searchSubmit().click()
  }

  openProductByName(name) {
    this.productNames().contains(name).click()
  }

  sortBy(option) {
    this.sortDropdown().select(option)
  }

  goToCart() {
    this.cartLink().click()
  }
}

export const homePage = new HomePage()
