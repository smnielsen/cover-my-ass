module.exports = {
  allowedLicenses: [
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
  ],
  // Overrides for packages that license checker doesn't find correctly.
  // Note: MUST be manually verified that these have an acceptable license in the repository.
  whitelistedRepositories: [
    'https://github.com/lloyd/JSONSelect', // ISC, checked 2018-08-02
    'https://github.com/substack/node-buffers', // MIT, checked 2018-08-02
    'https://github.com/Marak/colors.js', // MIT, checked 2018-08-02
    'https://github.com/zaach/jison', // MIT, checked 2018-08-02
    'https://github.com/harthur/nomnom', // MIT, checked 2018-08-02
    'https://github.com/jindw/xmldom', // MIT or LPGL checked 2019-01-11
  ],

  whitelistedOrganisations: ['https://github.com/smnielsen'],
}
