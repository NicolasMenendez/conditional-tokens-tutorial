const hre = require('hardhat')
const { ethers } = hre

async function main() {
  const deployConfig = require('./deployConfig')
  const markets = require('../markets.config')

  const conditionIds = markets.map(({ questionId }) =>
    ethers.solidityPackedKeccak256(
      ['address', 'bytes32', 'uint256'],
      [deployConfig.oracle, questionId, 2],
    ),
  )
  console.log('Condition IDs:', conditionIds)
  console.log('Deploy config uxd:', deployConfig.uxd)

  console.log()

  const UXD = await ethers.getContractFactory('ERC20')
  const collateralToken = await UXD.attach(deployConfig.uxd)

  console.log('Collateral token:', collateralToken.target)

  const LMSRMarketMakerFactory = await hre.ethers.getContractFactory('LMSRMarketMakerFactory', {
    libraries: {
      Fixed192x64Math: deployConfig.fixed192x64Math,
    },
  })
  const lmsrMarketMakerFactory = await LMSRMarketMakerFactory.attach(
    deployConfig.lmsrMarketMakerFactoryAddress,
  )

  console.log('LMSR Market Maker Factory:', lmsrMarketMakerFactory.target)

  const { ammFunding } = deployConfig

  console.log('Approving collateral...')
  const approveTx = await collateralToken.approve(lmsrMarketMakerFactory.target, ammFunding)
  await approveTx.wait()
  console.log('Collateral approved.')

  const ConditionalTokens = await ethers.getContractFactory('ConditionalTokens')
  const conditionalTokens = await ConditionalTokens.attach(deployConfig.conditionalTokensAddress)

  console.log('Creating LMSR Market Maker...')
  const lmsrFactoryTx = await lmsrMarketMakerFactory.createLMSRMarketMaker(
    conditionalTokens.target,
    collateralToken.target,
    conditionIds,
    0,
    ethers.ZeroAddress,
    ammFunding,
  )

  const receipt = await lmsrFactoryTx.wait()

  console.log(receipt)

  const creationLogEntry = receipt.events.find((event) => event.event === 'LMSRMarketMakerCreation')

  if (!creationLogEntry) {
    console.error(JSON.stringify(receipt, null, 2))
    throw new Error(
      'No LMSRMarketMakerCreation event fired. Please check the transaction receipt above. Possible causes: ABIs outdated, transaction failure, or unfunded LMSR.',
    )
  }

  console.log('LMSR Market Maker created successfully:', creationLogEntry.args.marketMaker)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// operator 0x1C08d042d22025FA915d5992A59102C93B840C9f
// oracle 0x03C4F6b1bd75Dab38d6473099E74c8295365e275
// trader 0x6c19D079d8Ca54a96dB902d06d06A284849831D7

// ethers.ZeroAddress
