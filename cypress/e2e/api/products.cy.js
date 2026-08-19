import { expectProductSchema, toolshopRequest } from '../../support/api/toolshopClient'

describe('API products', () => {
  it('lists paginated products with the published schema', { tags: '@smoke' }, () => {
    toolshopRequest('GET', '/products').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include.keys('current_page', 'data', 'last_page', 'per_page', 'total')
      expect(response.body.data).to.be.an('array').and.not.be.empty
      response.body.data.forEach(expectProductSchema)
    })
  })

  it('returns a single product that matches the list payload', () => {
    toolshopRequest('GET', '/products').then((listResponse) => {
      const product = listResponse.body.data[0]

      toolshopRequest('GET', `/products/${product.id}`).then((detailResponse) => {
        expect(detailResponse.status).to.eq(200)
        expectProductSchema(detailResponse.body)
        expect(detailResponse.body.id).to.eq(product.id)
        expect(detailResponse.body.name).to.eq(product.name)
        expect(detailResponse.body.price).to.eq(product.price)
      })
    })
  })

  it('searches products by name', () => {
    toolshopRequest('GET', '/products').then((listResponse) => {
      const term = listResponse.body.data[0].name.split(' ')[0]

      toolshopRequest('GET', `/products/search?q=${encodeURIComponent(term)}`).then((searchResponse) => {
        expect(searchResponse.status).to.eq(200)
        expect(searchResponse.body.data).to.be.an('array').and.not.be.empty
        expect(searchResponse.body.data.some((item) => item.name.includes(term))).to.eq(true)
      })
    })
  })

  it('returns 404 for an unknown product id', () => {
    toolshopRequest('GET', '/products/does-not-exist').then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})
