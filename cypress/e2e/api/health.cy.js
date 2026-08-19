import { toolshopRequest } from '../../support/api/toolshopClient'

describe('API health', () => {
  it('returns production status for the Toolshop API', { tags: '@smoke' }, () => {
    toolshopRequest('GET', '/status').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include.keys('version', 'environment', 'app_name')
      expect(response.body.app_name).to.eq('Toolshop')
      expect(response.body.environment).to.eq('production')
    })
  })
})
