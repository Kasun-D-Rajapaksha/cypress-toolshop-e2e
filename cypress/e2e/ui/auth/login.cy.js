import { loginPage } from '../../../support/pages/loginPage'
import { homePage } from '../../../support/pages/homePage'
import users from '../../../fixtures/users.json'

describe('UI login', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('logs in with the published customer account', { tags: '@smoke' }, () => {
    loginPage.login(users.customer.email, users.customer.password)

    cy.url().should('include', '/account')
    homePage.navMenu().should('be.visible')
  })

  it('shows an error for an incorrect password', () => {
    loginPage.login(users.invalid.email, users.invalid.password)

    cy.url().should('include', '/auth/login')
    loginPage.loginError().should('be.visible')
  })

  it('requires an email address', () => {
    loginPage.login('', users.customer.password)

    loginPage.emailError().should('be.visible')
  })

  it('requires a password', () => {
    loginPage.login(users.customer.email, '')

    loginPage.passwordError().should('be.visible')
  })
})
