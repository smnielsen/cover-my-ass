const { init, licenseCheck } = require('../src/licenseCheck')

describe('licenseCheck', () => {
  describe('init', () => {
    test('init should throw with invalid dir', async () => {
      await expect(init('/my/invalid/dir')).rejects.toThrow(
        'No packages found in this path..',
      )
    })

    test('init should work with valid dir', async () => {
      await expect(init().then((data) => typeof data)).resolves.toBe('object')
    })
  })

  describe('with disallowed packages', () => {
    test('should return disallowed license', async () => {
      const disallowed = licenseCheck({
        'my-disallowed-package': {
          licenses: 'MIT-disallowed',
          repository: 'https://github.com/disallowed/unknown',
        },
      })
      expect(disallowed).toEqual(['my-disallowed-package'])
    })

    test('[OR] should return disallowed license', async () => {
      const disallowed = licenseCheck({
        'my-or-disallowed-package': {
          licenses: '(DISALLOWED OR CC-DISALLOWED)',
          repository: 'https://github.com/or-disallowed/unknown',
        },
      })
      expect(disallowed).toEqual(['my-or-disallowed-package'])
    })

    test('[ARRAY] should return disallowed license', async () => {
      const disallowed = licenseCheck({
        'my-array-disallowed-package': {
          licenses: ['DISALLOWED'],
          repository: 'https://github.com/disallowed/unknown',
        },
      })
      expect(disallowed).toEqual(['my-array-disallowed-package'])
    })
  })

  describe('with allowed package', () => {
    test('should be OK', async () => {
      const disallowed = licenseCheck({
        'my-allowed-package': {
          licenses: 'MIT',
          repository: 'https://github.com/unknown/unknown',
        },
      })
      expect(disallowed).toEqual([])
    })

    describe('with valid array of licenses', () => {
      test('should be OK', async () => {
        const disallowed = licenseCheck({
          'my-array-allowed-package': {
            licenses: '(MIT OR DISALLOWED)',
            repository: 'https://github.com/unknown/unknown',
          },
        })
        expect(disallowed).toEqual([])
      })
    })
    describe('with whitelisted repository', () => {
      test('should be OK', async () => {
        const disallowed = licenseCheck({
          'my-whitelisted-package': {
            licenses: 'UNLICENSED',
            repository: 'https://github.com/lloyd/JSONSelect',
          },
        })
        expect(disallowed).toEqual([])
      })
    })

    describe('with lightelligence package and disallowed license', () => {
      test('should be OK', async () => {
        const disallowed = licenseCheck({
          'my-smn-package': {
            licenses: 'UNLICENSED',
            repository: 'https://github.com/smnielsen/cover-my-ass',
          },
        })
        expect(disallowed).toEqual([])
      })
    })
  })
})
