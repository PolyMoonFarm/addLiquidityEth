async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log(
    "Deployer balance in ETH:",
    (await deployer.getBalance()).toString()
  );

  const CloutCoin = await ethers.getContractFactory("CloutCoin");
  const cloutcoin = await CloutCoin.deploy("CloutCoin", "CC", 5);

  console.log("cloutcoin contract address:", cloutcoin.address);
  console.log(
    `Deployer balance in cloutcoin: ${await cloutcoin.balanceOf(
      deployer.address
    )}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
