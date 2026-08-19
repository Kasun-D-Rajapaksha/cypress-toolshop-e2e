import { toolshopRequest } from '../../support/api/toolshopClient'

describe('API carts', () => {
  it('creates, updates, and deletes a cart', () => {
    toolshopRequest('GET', '/products').then((productsResponse) => {
      const productId = productsResponse.body.data[0].id

      toolshopRequest('POST', '/carts').then((createResponse) => {
        expect(createResponse.status).to.eq(201)
        expect(createResponse.body.id).to.be.a('string').and.not.be.empty
        const cartId = createResponse.body.id

        toolshopRequest('POST', `/carts/${cartId}`, {
          body: { product_id: productId, quantity: 1 },
        }).then((addResponse) => {
          expect(addResponse.status).to.eq(200)
        })

        toolshopRequest('GET', `/carts/${cartId}`).then((getResponse) => {
          expect(getResponse.status).to.eq(200)
          expect(getResponse.body.id).to.eq(cartId)
        })

        toolshopRequest('DELETE', `/carts/${cartId}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.be.oneOf([200, 204])
        })

        toolshopRequest('GET', `/carts/${cartId}`).then((missingResponse) => {
          expect(missingResponse.status).to.eq(404)
        })
      })
    })
  })

  it('rejects adding an unknown product to a cart', () => {
    toolshopRequest('POST', '/carts').then((createResponse) => {
      const cartId = createResponse.body.id

      toolshopRequest('POST', `/carts/${cartId}`, {
        body: { product_id: 'does-not-exist', quantity: 1 },
      }).then((response) => {
        expect(response.status).to.be.oneOf([404, 422])
      })
    })
  })
})
