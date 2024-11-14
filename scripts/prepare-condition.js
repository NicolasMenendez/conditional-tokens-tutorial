const hre = require('hardhat')
const { ethers } = hre

async function main() {
  // Load deploy configuration and market settings
  const deployConfig = require('./deployConfig')
  const markets = require('../markets.config')

  console.log(deployConfig)
  console.log(markets)

  // Fetch the deployed ConditionalTokens contract
  const ConditionalTokens = await ethers.getContractFactory('ConditionalTokens')
  const pmSystem = await ConditionalTokens.attach(deployConfig.conditionalTokensAddress)

  // Prepare conditions for each market
  for (const { questionId } of markets) {
    console.log(`Preparing condition for question ID: ${questionId}`)
    const tx = await pmSystem.prepareCondition(deployConfig.oracle, questionId, 2)
    await tx.wait() // Wait for the transaction to be mined
    console.log(`Condition prepared: ${questionId}`)
  }

  console.log('All conditions prepared successfully.')
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
