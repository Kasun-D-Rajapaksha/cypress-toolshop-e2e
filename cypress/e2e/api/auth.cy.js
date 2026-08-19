import users from '../../fixtures/users.json'
import { toolshopRequest, uniqueCustomer } from '../../support/api/toolshopClient'

describe('API auth', () => {
  it('issues a bearer token for the published customer account', { tags: '@smoke' }, () => {
    toolshopRequest('POST', '/users/login', {
      body: {
        email: users.customer.email,
        password: users.customer.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.keys('access_token', 'token_type', 'expires_in')
      expect(response.body.access_token).to.be.a('string').and.not.be.empty
      expect(String(response.body.token_type).toLowerCase()).to.eq('bearer')
    })
  })

  it('rejects invalid credentials without a token', () => {
    toolshopRequest('POST', '/users/login', {
      body: {
        email: users.invalid.email,
        password: users.invalid.password,
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 422])
      expect(response.body).to.not.have.property('access_token')
    })
  })

  it('returns the current user when authorized', () => {
    toolshopRequest('POST', '/users/login', {
      body: {
        email: users.customer.email,
        password: users.customer.password,
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)

      toolshopRequest('GET', '/users/me', {
        headers: {
          Authorization: `Bearer ${loginResponse.body.access_token}`,
        },
      }).then((meResponse) => {
        expect(meResponse.status).to.eq(200)
        expect(meResponse.body.email).to.eq(users.customer.email)
        expect(meResponse.body).to.include.keys('id', 'first_name', 'last_name')
      })
    })
  })

  it('returns 401 for /users/me without a token', () => {
    toolshopRequest('GET', '/users/me').then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('registers a unique customer', () => {
    const customer = uniqueCustomer()

    toolshopRequest('POST', '/users/register', { body: customer }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.email).to.eq(customer.email)
      expect(response.body).to.include.keys('id', 'first_name', 'last_name')
    })
  })
})
