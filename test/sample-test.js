const { assert } = require("chai");

describe("Influencer Solidity Contract Testing", function () {
  let IUniswapV2Router02;

  let contract;
  let owner;
  let cloutCoin;
  const supply = (100n * 10n ** 18n).toString();
  let cloutCoinAddress = 0x0dead;

  before("Should deploy the CloutCoin Contract", async () => {
    const CloutCoin = await ethers.getContractFactory("CloutCoin");
    IUniswapV2Router02 = await ethers.getContractAt(
      "IUniswapV2Router02",
      "0x7a250d5630b4cf539739df2c5dacb4c659f2488d"
    );

    cloutCoin = await CloutCoin.deploy(supply);
    await cloutCoin.deployed();
    owner = await ethers.getSigner(0);

    //sets global clout coin address
    cloutCoinAddress = cloutCoin.address;
    console.log("cloutCoinAddress:", cloutCoin.address);

    //gets the cloutclout balance
    let cloutCoinBalance = await cloutCoin.balanceOf(owner.address);
    console.log("cloutCoinBalance", cloutCoinBalance.toString());
  });

  it("deploy the timelock escrow contract", async function () {
    const TimeLock = await ethers.getContractFactory("TimeLock");
    contract = await TimeLock.deploy();
    owner = await ethers.getSigner(0);
  });

  it("Create / add balance to a company", async () => {
    console.log("Owner", owner.address);
    let depositAmount = await contract.companyDeposit({
      value: ethers.utils.parseEther("0.1"),
    });
  });

  it("makeAddPool front-end", async () => {
    let valueEth = ethers.utils.parseEther("1");
    let valueCC = ethers.utils.parseEther("10");

    // console.log(value.toString());

    await cloutCoin.approve(
      "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      valueCC
    );

    await IUniswapV2Router02.addLiquidityETH(
      cloutCoin.address,
      valueCC,
      valueCC,
      valueEth,
      owner.address,
      1911516272,
      { value: valueEth }
    );
  });

  // it("makeAddPool", async () => {
  //   console.log("Owner", owner.address);
  //   // await cloutCoin.approve(cloutCoin.address, 100);
  //   // let allowance = await cloutCoin.allowance(owner.address, cloutCoin.address);
  //   // console.log(allowance.toString());

  //   await cloutCoin.transfer(contract.address, 5);

  //   await owner.sendTransaction({
  //     to: contract.address,
  //     value: ethers.utils.parseEther("1"),
  //   });

  //   let cloutCoinBalance = await cloutCoin.balanceOf(contract.address);
  //   console.log(cloutCoinBalance.toString());

  //   await contract.makeAddPool(cloutCoin.address, {
  //     value: ethers.utils.parseEther("1"),
  //   });
  // });

  // it("makeAddPool", async () => {
  //   // console.log(cloutCoin);
  //   // await cloutCoin.approve(cloutCoinAddress, 10000);
  //   const IUniswapV2Router02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  //   const uni = await ethers.getContractAt("IERC20", IUniswapV2Router02);

  //   let amountTokenDesired = ethers.utils.parseEther("5");
  //   let amountEthMin = ethers.utils.parseEther("0.1");

  //   await cloutCoin.approve(IUniswapV2Router02, amountTokenDesired);
  //   let val = await cloutCoin.allowance(owner.address, IUniswapV2Router02);
  //   console.log(val.toString());

  //   await cloutCoin.connect(owner).approve(IUniswapV2Router02, amountTokenDesired);

  //   // await cloutCoin.approve(contract.address, ethers.utils.parseEther("1"));
  //   // let bal = await cloutCoin.allowance(owner.address, contract.address);
  //   // console.log(bal.toString());

  //   // await contract.makeAddPool(
  //   //   cloutCoinAddress,
  //   //   amountTokenDesired,
  //   //   amountTokenDesired,
  //   //   amountEthMin,
  //   //   owner.address,
  //   //   {
  //   //     value: ethers.utils.parseEther("0.5"),
  //   //   }
  //   // );

  //   await contract.makeAddPool(
  //     cloutCoin.address,
  //     ethers.utils.parseEther("0.01"),
  //     ethers.utils.parseEther("0.01"),
  //     ethers.utils.parseEther("0.1"),
  //     owner.address,
  //     { value: ethers.utils.parseEther("1") }
  //   );
  // });
});

// describe("Greeter", function () {
//     let contract;
//     let owner;

//     it("Should return the new greeting once it's changed", async function () {
//         const CloutApp = await ethers.getContractFactory("CloutApp");
//         contract = await CloutApp.deploy();
//         owner = await ethers.getSigner(0);
//     });

//     it("Emit event", async function () {
//         const queuePositionPromise = new Promise((resolve, reject) => {
//             contract.on("NewUserAdded", (position, addr, event) => {
//                 event.removeListener();

//                 console.log(`Queue Position: ${position.toString()}`);
//                 console.log(`Address of request-er: ${addr}`);

//                 resolve();
//             });

//             setTimeout(() => {
//                 reject(new Error("Timout for InQueueForRandomNumber"));
//             }, 60000);
//         });

//         await contract.signUp(owner.address);
//         await queuePositionPromise;
//     });

//     it("Emit event", async function () {
//         await contract.signUp(owner.address);

//         contract.listeners("NewUserAdded", (position, addr, event) => {
//             event.removeListener();

//             console.log(`Queue Position: ${position.toString()}`);
//             console.log(`Address of request-er: ${addr}`);

//             resolve();
//         });
//         console.log("yeet");
//     });
// });
