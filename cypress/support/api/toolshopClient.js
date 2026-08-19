import { AUT } from '../config'

export function toolshopRequest(method, path, options = {}) {
  return cy.request({
    method,
    url: `${AUT.api}${path}`,
    failOnStatusCode: false,
    ...options,
  })
}

export function expectProductSchema(product) {
  expect(product).to.include.keys('id', 'name', 'price', 'in_stock')
  expect(product.id).to.be.a('string').and.not.be.empty
  expect(product.name).to.be.a('string').and.not.be.empty
  expect(product.price).to.be.a('number')
  expect(product.in_stock).to.be.a('boolean')
}

export function uniqueCustomer() {
  const stamp = Date.now()

  return {
    first_name: 'Kasun',
    last_name: 'QA',
    email: `qa.kasun.${stamp}@example.com`,
    password: 'Toolshop@1234',
    dob: '1990-01-15',
    phone: '0771234567',
    address: {
      street: 'Demo Street',
      house_number: '12',
      city: 'Colombo',
      state: 'Western',
      country: 'Sri Lanka',
      postal_code: '10400',
    },
  }
}
