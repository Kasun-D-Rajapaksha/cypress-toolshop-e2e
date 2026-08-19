/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAs(userKey?: string): Chainable<void>
  }
}

export {}
