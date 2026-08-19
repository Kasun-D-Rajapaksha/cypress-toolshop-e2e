/// <reference types="cypress" />

import { loginPage } from './pages/loginPage'
import { homePage } from './pages/homePage'
import users from '../fixtures/users.json'

Cypress.Commands.add('loginAs', (userKey = 'customer') => {
  const user = users[userKey]

  if (!user) {
    throw new Error(`Unknown user key "${userKey}". Check cypress/fixtures/users.json.`)
  }

  cy.session(
    userKey,
    () => {
      loginPage.visit()
      loginPage.login(user.email, user.password)
      cy.url().should('include', '/account')
      homePage.navMenu().should('be.visible')
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        cy.visit('/')
        cy.window()
          .its('localStorage')
          .invoke('getItem', 'auth-token')
          .should('be.a', 'string')
          .and('not.be.empty')
      },
    },
  )

  cy.visit('/')
})
