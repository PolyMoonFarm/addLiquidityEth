const { expect, assert } = require("chai");

describe("Influencer Solidity Contract Testing", function () {
  //   // let IUniswapV2Router02;

  //   // let contract;
  let owner, addr1, addr2, addr3;
  //   // let cloutCoinAddress = 0x0dead;
  const tName_ = "CloutCoin";
  const tSymbol_ = "CC";
  const tSupply_ = (200n * 10n ** 18n).toString();
  let cloutcoin;

  before(async () => {
    // deploy cloutcoin
    const CloutCoin = await ethers.getContractFactory("CloutCoin");

    cloutcoin = await CloutCoin.deploy(tName_, tSymbol_, tSupply_);
    await cloutcoin.deployed();
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    console.log("name: " + (await cloutcoin.name()));
    console.log("symbol: " + (await cloutcoin.symbol()));
    console.log("supply: " + (await cloutcoin.totalSupply()));
    console.log("cloutcoin address: " + (await cloutcoin.address));
    // console.log(accounts[3].address);

    //     // IUniswapV2Router02 = await ethers.getContractAt(
    //     //   "IUniswapV2Router02",
    //     //   "0x7a250d5630b4cf539739df2c5dacb4c659f2488d"
    //     // );

    //     // //sets global clout coin address
    //     // cloutCoinAddress = cloutCoin.address;
    //     // console.log("cloutCoinAddress: ", cloutCoin.address);

    //     // //gets the cloutcoin balance
    //     // let cloutCoinBalance = await cloutCoin.balanceOf(owner.address);
    //     // console.log("cloutCoinBalance: ", cloutCoinBalance.toString());
  });

  it("deploys the CloutCoin contract", async () => {
    try {
      assert.ok(cloutcoin.address);
    } catch (error) {
      console.log(error);
    }
  });

  it("deploys the timelock escrow contract", async function () {
    try {
      const TimeLock = await ethers.getContractFactory("TimeLock");
      timelock = await TimeLock.deploy();
      console.log("timelock address: " + (await timelock.address));
      assert.ok(await timelock.address);
    } catch (error) {
      console.log(error);
    }
  });

  it("lets an address send clout to another address", async () => {
    try {
      await cloutcoin.transfer(addr1.address, 10000);
      assert.equal(await cloutcoin.balanceOf(addr1.address), 10000);
      await cloutcoin.connect(addr1).transfer(addr2.address, 5000);
      assert.equal(await cloutcoin.balanceOf(addr1.address), 5000);
      // console.log(receipt2);
    } catch (error) {
      console.log(error);
    }
  });

  // it("allows a token holder to  approve the transfer of tokens to the timelock contract address", async () => {
  //     await timelock.transferToMe()
  // });

  it("allows a token holder to  approve the transfer of tokens to the timelock contract address", async () => {
    // approve the transfer of tokens
    await cloutcoin.connect(addr2).approve(timelock.address, 4000);

    // check to see the
    assert.equal(
      await cloutcoin.allowance(addr2.address, timelock.address),
      4000
    );

    let tx = await timelock.transferToMe(addr2.address, timelock.address, 4000);
    console.log("tx: " + tx);

    // assert.equal(await cloutcoin.balanceOf(timelock.address), 4000);
  });

  // it("Create/Add a balance to a project", async () => {
  //   await timelock.companyDeposit({
  //     value: ethers.utils.parseEther("0.1"),
  //   });
  // });

  // it("lets a company send cloutcoin to the timelock contract", async () => {
  //   try {
  //     receipt = await cloutcoin.connect(addr2).transfer(timelock.address, 2000);
  //     assert.equal(await cloutcoin.balanceOf(timelock.address), 2000);
  //     console.log("mapping: " + (await timelock.companyBal(addr2.address)));
  //     console.log("mapping1: " + (await timelock.companyBal(addr3.address)));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // it("updates the companies mapping via the receive func", async () => {
  //   await
  // });

  //   // it("makeAddPool front-end", async () => {
  //   //   let valueEth = ethers.utils.parseEther("1");
  //   //   let valueCC = ethers.utils.parseEther("10");

  //   //   // console.log(value.toString());

  //   //   await cloutCoin.approve(
  //   //     "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
  //   //     valueCC
  //   //   );

  //   //   await IUniswapV2Router02.addLiquidityETH(
  //   //     cloutCoin.address,
  //   //     valueCC,
  //   //     valueCC,
  //   //     valueEth,
  //   //     owner.address,
  //   //     1911516272,
  //   //     { value: valueEth }
  //   //   );
  //   // });

  //   // it("makeAddPool", async () => {
  //   //   console.log("Owner", owner.address);
  //   //   // await cloutCoin.approve(cloutCoin.address, 100);
  //   //   // let allowance = await cloutCoin.allowance(owner.address, cloutCoin.address);
  //   //   // console.log(allowance.toString());

  //   //   await cloutCoin.transfer(contract.address, 5);

  //   //   await owner.sendTransaction({
  //   //     to: contract.address,
  //   //     value: ethers.utils.parseEther("1"),
  //   //   });

  //   //   let cloutCoinBalance = await cloutCoin.balanceOf(contract.address);
  //   //   console.log(cloutCoinBalance.toString());

  //   //   await contract.makeAddPool(cloutCoin.address, {
  //   //     value: ethers.utils.parseEther("1"),
  //   //   });
  //   // });

  //   // it("makeAddPool", async () => {
  //   //   // console.log(cloutCoin);
  //   //   // await cloutCoin.approve(cloutCoinAddress, 10000);
  //   //   const IUniswapV2Router02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  //   //   const uni = await ethers.getContractAt("IERC20", IUniswapV2Router02);

  //   //   let amountTokenDesired = ethers.utils.parseEther("5");
  //   //   let amountEthMin = ethers.utils.parseEther("0.1");

  //   //   await cloutCoin.approve(IUniswapV2Router02, amountTokenDesired);
  //   //   let val = await cloutCoin.allowance(owner.address, IUniswapV2Router02);
  //   //   console.log(val.toString());

  //   //   await cloutCoin.connect(owner).approve(IUniswapV2Router02, amountTokenDesired);

  //   //   // await cloutCoin.approve(contract.address, ethers.utils.parseEther("1"));
  //   //   // let bal = await cloutCoin.allowance(owner.address, contract.address);
  //   //   // console.log(bal.toString());

  //   //   // await contract.makeAddPool(
  //   //   //   cloutCoinAddress,
  //   //   //   amountTokenDesired,
  //   //   //   amountTokenDesired,
  //   //   //   amountEthMin,
  //   //   //   owner.address,
  //   //   //   {
  //   //   //     value: ethers.utils.parseEther("0.5"),
  //   //   //   }
  //   //   // );

  //   //   await contract.makeAddPool(
  //   //     cloutCoin.address,
  //   //     ethers.utils.parseEther("0.01"),
  //   //     ethers.utils.parseEther("0.01"),
  //   //     ethers.utils.parseEther("0.1"),
  //   //     owner.address,
  //   //     { value: ethers.utils.parseEther("1") }
  //   //   );
  //   // });
  // });

  // // describe("Greeter", function () {
  // //     let contract;
  // //     let owner;

  // //     it("Should return the new greeting once it's changed", async function () {
  // //         const CloutApp = await ethers.getContractFactory("CloutApp");
  // //         contract = await CloutApp.deploy();
  // //         owner = await ethers.getSigner(0);
  // //     });

  // //     it("Emit event", async function () {
  // //         const queuePositionPromise = new Promise((resolve, reject) => {
  // //             contract.on("NewUserAdded", (position, addr, event) => {
  // //                 event.removeListener();

  // //                 console.log(`Queue Position: ${position.toString()}`);
  // //                 console.log(`Address of request-er: ${addr}`);

  // //                 resolve();
  // //             });

  // //             setTimeout(() => {
  // //                 reject(new Error("Timout for InQueueForRandomNumber"));
  // //             }, 60000);
  // //         });

  // //         await contract.signUp(owner.address);
  // //         await queuePositionPromise;
  // //     });

  // //     it("Emit event", async function () {
  // //         await contract.signUp(owner.address);

  // //         contract.listeners("NewUserAdded", (position, addr, event) => {
  // //             event.removeListener();

  // //             console.log(`Queue Position: ${position.toString()}`);
  // //             console.log(`Address of request-er: ${addr}`);

  // //             resolve();
  // //         });
  // //         console.log("yeet");
  // //     });
});
