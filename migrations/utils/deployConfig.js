module.exports = (artifacts) => ({
  conditionalTokensAddress: '0xaba5e0a5Ee0459699b9F6b18635D8b3E491cb7Cc',
  ammFunding: process.env.REACT_APP_FUNDING || '1' + '0'.repeat(18),
  oracle: '0x03C4F6b1bd75Dab38d6473099E74c8295365e275',
  // oracle:
  //   process.env.REACT_APP_ORACLE_ADDRESS || artifacts.require('Migrations').defaults()['from'],
})
