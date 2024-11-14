require('@nomicfoundation/hardhat-toolbox')
require('dotenv-defaults').config()

const PRIVATE_KEYS = process.env.PRIVATE_KEYS

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    lachain: {
      url: 'https://rpc1.mainnet.lachain.network',
      accounts: PRIVATE_KEYS.split(','),
      chainId: 274,
      gasPrice: 1000000007,
    },
    latestnet: {
      url: 'https://rpc.testnet.lachain.network',
      accounts: PRIVATE_KEYS.split(','),
      chainId: 418,
      gasPrice: 1000000007,
    },
  },
  etherscan: {
    apiKey: {
      latestnet: 'ETHERSCAN_KEY',
      lachain: 'ETHERSCAN_KEY',
    },
    customChains: [
      {
        network: 'latestnet',
        chainId: 418,
        urls: {
          apiURL: 'https://testexplorer-api.lachain.network/api',
          browserURL: 'https://testexplorer-api.lachain.network',
        },
      },
      {
        network: 'lachain',
        chainId: 274,
        urls: {
          apiURL: 'https://explorer-api.lachain.network/api',
          browserURL: 'https://explorer-api.lachain.network',
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
  },
  abiExporter: {
    spacing: 2,
  },
  solidity: {
    compilers: [
      {
        version: '0.5.10',
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
}
