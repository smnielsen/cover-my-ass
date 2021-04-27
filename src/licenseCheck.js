// Must conform to the green list in
// https://lightelligence.atlassian.net/wiki/x/oQDDEw
require('colors')
const assert = require('assert')
const checker = require('license-checker')

const allowedLicenses = [
  'MIT',
  'MIT*',
  'ISC',
  'BSD',
  'BSD*',
  'BSD-3-Clause OR MIT',
  '(MIT AND BSD-3-Clause)',
  'BSD-2-Clause',
  '(BSD-2-Clause OR MIT OR Apache-2.0)',
  'BSD-3-Clause',
  'Apache-2.0',
  'Apache License, Version 2.0',
  'Apache 2.0',
  'Apache*',
  '(MIT OR Apache-2.0)',
  '(MIT AND Apache-2.0)',
  '(MIT AND CC-BY-3.0)',
  '(MIT AND Zlib)',
  'MPL-2.0 OR Apache-2.0', // Note: MPL (versions: 1.0, 1.1) are *not* on green list; but can be ignored here, as it's dual-licensed and we chose Apache-2.0 (which is on the green list)
  'MPL-2.0',
  '0BSD',
  '(WTFPL OR MIT)',
  '(MIT OR WTFPL)',
  'WTFPL',
  'CC0-1.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'Public Domain',
  'Unlicense',
]
// Overrides for packages that license checker doesn't find correctly.
// Note: MUST be manually verified that these have an acceptable license in the repository.
const whitelistedRepositories = [
  'https://github.com/lloyd/JSONSelect', // ISC, checked 2018-08-02
  'https://github.com/substack/node-buffers', // MIT, checked 2018-08-02
  'https://github.com/Marak/colors.js', // MIT, checked 2018-08-02
  'https://github.com/zaach/jison', // MIT, checked 2018-08-02
  'https://github.com/harthur/nomnom', // MIT, checked 2018-08-02
  'https://github.com/jindw/xmldom', // MIT or LPGL checked 2019-01-11
]

const whitelistedOrganisations = ['https://github.com/smnielsen']

const init = (dir = process.cwd()) =>
  new Promise((resolve, reject) => {
    checker.init(
      {
        start: dir,
      },
      (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      },
    )
  })

const licenseCheck = (packages) =>
  Object.keys(packages).filter((pkgName) => {
    assert(packages, 'packages are required as first param')
    const pkg = packages[pkgName]
    if (typeof pkg.licenses === 'string') {
      if (allowedLicenses.indexOf(pkg.licenses) !== -1) {
        // License on green list
        return false
      }
      /**
       * If licence comes like "(Licence-1 OR Licence-2 OR...)"
       * or "Licence-1 OR Licence-2 OR..." splitting to array of licences
       * Will be proceeded in next IF block
       */
      if (/\sOR\s/g.test(pkg.licenses)) {
        pkg.licenses = pkg.licenses.replace(/[()]/g, '').split(/\s+OR\s+/)
      }
    }
    if (pkg.private) {
      // Always except private since it's probably a local dependency
      return false
    }
    if (
      Array.isArray(pkg.licenses) &&
      pkg.licenses.find((license) => allowedLicenses.indexOf(license) !== -1)
    ) {
      // At least one of licenses on green list
      return false
    }
    if (whitelistedRepositories.indexOf(pkg.repository) !== -1) {
      // Package that we can't check programmatically but has been vetted manually
      return false
    }
    const disallowed = whitelistedOrganisations.filter(
      (org) => pkg.repository && pkg.repository.indexOf(org) !== -1,
    )
    if (disallowed.length > 0) {
      // Internal package
      return false
    }
    // eslint-disable-next-line no-console
    console.log(`>> "${pkgName}" found disallowed license`.red, pkg)
    return true
  })

module.exports = {
  init,
  licenseCheck,
}
