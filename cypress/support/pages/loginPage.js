class LoginPage {
  emailInput() {
    return cy.get('[data-test="email"]')
  }

  passwordInput() {
    return cy.get('[data-test="password"]')
  }

  submitButton() {
    return cy.get('[data-test="login-submit"]')
  }

  loginError() {
    return cy.get('[data-test="login-error"]')
  }

  emailError() {
    return cy.get('[data-test="email-error"]')
  }

  passwordError() {
    return cy.get('[data-test="password-error"]')
  }

  visit() {
    cy.visit('/auth/login')
  }

  login(email, password) {
    if (email) {
      this.emailInput().clear().type(email)
    }

    if (password) {
      this.passwordInput().clear().type(password)
    }

    this.submitButton().click()
  }
}

export const loginPage = new LoginPage()
