module.exports = deployConfig = {
  conditionalTokensAddress: '0xaba5e0a5Ee0459699b9F6b18635D8b3E491cb7Cc',
  uxd: '0xf6Ca7FD7722b5Fa683788aE56b82df3501B54386',
  oracle: '0x03C4F6b1bd75Dab38d6473099E74c8295365e275',
  fixed192x64Math: '0xB9Ffa01CDDD76e5D1ce85e4B6541f81654448a97',
  lmsrMarketMakerFactoryAddress: '0xc7c823564BF6a336Ce45dDfE67D3900B6a1c8966',
  ammFunding: '100000000000000000000',
  // oracle:
  //   process.env.REACT_APP_ORACLE_ADDRESS || artifacts.require('Migrations').defaults()['from'],
  // ammFunding: process.env.REACT_APP_FUNDING || '1' + '0'.repeat(18),
}
