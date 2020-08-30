const { expect } = require('chai')
const { init, licenseCheck } = require('./src/licenseCheck')

describe('Licenses used in this project', () => {
  let packages

  // eslint-disable-next-line
  before(async () => {
    packages = await init()
  })

  it('should contain only allowed FOSS licenses', () => {
    const disallowed = licenseCheck(packages)
    expect(disallowed).to.eql([])
  })
})
