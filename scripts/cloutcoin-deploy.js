async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);

  console.log(
    "Deployer balance in ETH:",
    (await deployer.getBalance()).toString()
  );

  // deploy the CloutCoin conttract
  console.log("deploying the CloutCoin Contract .... ");
  const _pubSupply = (200n * 10n ** 18n).toString();
  const _priSupply = (200n * 10n ** 18n).toString();

  const CloutCoin = await ethers.getContractFactory("CloutCoin");
  const cloutcoin = await CloutCoin.deploy(
    "CloutCoin",
    "CC",
    _pubSupply,
    _priSupply
  );

  console.log("cloutcoin contract address: ", await cloutcoin.address);
  console.log("owner of the CloutCoin contract: " + (await cloutcoin.owner()));
  console.log(
    `Deployer balance in cloutcoin: ${await cloutcoin.balanceOf(
      deployer.address
    )}`
  );

  console.log(
    `cloutcoin contract balance in cloutcoin: ${await cloutcoin.balanceOf(
      cloutcoin.address
    )}`
  );
  console.log(`cloutcoin total supply: ${await cloutcoin.totalSupply()}`);

  // deploy the TimeLock contract
  console.log("deploying the TimeLock Contract .... ");

  const TimeLock = await ethers.getContractFactory("TimeLock");
  const timelock = await TimeLock.deploy();

  console.log("timelock contract address:", timelock.address);
  console.log("owner of the TimeLock contract: " + (await timelock.owner()));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
