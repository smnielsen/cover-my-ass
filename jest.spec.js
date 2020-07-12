const { init, licenseCheck } = require('./src/licenseCheck')

describe('Licenses used in this project', () => {
  let packages

  beforeAll(async () => {
    packages = init()
  })

  test('should contain only allowed FOSS licenses', () => {
    const disallowed = licenseCheck(packages)
    expect(disallowed).toEqual([])
  })
})
