import { toolshopRequest, uniqueCustomer } from '../../support/api/toolshopClient'
import { loginPage } from '../../support/pages/loginPage'
import { homePage } from '../../support/pages/homePage'

describe('Hybrid account setup', () => {
  it('registers a user through the API and signs in through the UI', () => {
    const customer = uniqueCustomer()

    toolshopRequest('POST', '/users/register', { body: customer }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.email).to.eq(customer.email)
    })

    loginPage.visit()
    loginPage.login(customer.email, customer.password)

    cy.url().should('include', '/account')
    homePage.navMenu().should('contain', customer.first_name)
  })
})
