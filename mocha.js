const { expect } = require('chai')
const { init, licenseCheck } = require('./src/licenseCheck')

describe('Licenses used in this project', function() {
  this.timeout(10000)
  it('should contain only allowed FOSS licenses', async () => {
    const packages = await init()
    const disallowed = licenseCheck(packages)
    expect(disallowed).to.eql([])
  })
})
