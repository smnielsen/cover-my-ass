const createLicenseCheck = require('./src/licenseCheck')

describe('Licenses used in this project', () => {
  let licenseCheck

  beforeAll(async () => {
    licenseCheck = createLicenseCheck({})
  })

  test('should contain only allowed FOSS licenses', () => {
    const disallowed = licenseCheck()
    expect(disallowed).toEqual([])
  })
})
