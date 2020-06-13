const { expect } = require('chai')
const { init, licenseCheck } = require('./src/licenseCheck')

describe('Licenses used in this project', () => {
  let packages

  it('should be possible to list', async () => {
    const data = await init(process.cwd())
    expect(data).to.be.an('object')
    packages = data
  })

  it('should contain only allowed FOSS licenses', () => {
    const disallowed = licenseCheck(packages)
    expect(disallowed).to.eql([])
  })
})
