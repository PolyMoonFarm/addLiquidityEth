const { assert } = require("chai");

describe("Influencer Solidity Contract Testing", function () {
  let contract;
  let owner;
  let cc;
  const supply = 5;
  let cloutCoinAddress = 0x0dead;

  before("Should deploy the CloutCoin Contract", async () => {
    owner = await ethers.getSigner(0);
    const CloutCoin = await ethers.getContractFactory("CloutCoin");
    cc = await CloutCoin.deploy(supply);
    await cc.deployed();

    //sets global clout coin address
    cloutCoinAddress = cc.address;
    console.log("cloutCoinAddress:", cc.address);

    let ccBalance = await cc.balanceOf(owner.address);
    console.log("CCBalance", ccBalance.toString());
  });

  it("Should return the new greeting once it's changed", async function () {
    const TimeLock = await ethers.getContractFactory("TimeLock");
    contract = await TimeLock.deploy();
    owner = await ethers.getSigner(0);
  });

  it("Should return the current block timestamp", async () => {
    let time = await contract.blockTime();
    console.log(time.toString());
  });

  it("Create / add balance to a company", async () => {
    console.log("Owner", owner.address);
    let depositAmount = await contract.companyDeposit({
      value: ethers.utils.parseEther("0.1"),
    });

    // console.log(depositAmount);
  });

  it("makeAddPool", async () => {
    console.log("Owner", owner.address);
    // await cc.approve(cc.address, 100);
    // let allowance = await cc.allowance(owner.address, cc.address);
    // console.log(allowance.toString());

    await cc.transfer(contract.address, 5);

    await owner.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseEther("1"),
    });

    let ccBalance = await cc.balanceOf(contract.address);
    console.log(ccBalance.toString());

    await contract.makeAddPool(cc.address, {
      value: ethers.utils.parseEther("1"),
    });
  });

  it("makeAddPool2", async () => {
    console.log("Owner", owner.address);
  });

  // it("makeAddPool", async () => {
  //   // console.log(cc);
  //   // await cc.approve(cloutCoinAddress, 10000);
  //   const IUniswapV2Router02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  //   const uni = await ethers.getContractAt("IERC20", IUniswapV2Router02);

  //   let amountTokenDesired = ethers.utils.parseEther("5");
  //   let amountEthMin = ethers.utils.parseEther("0.1");

  //   await cc.approve(IUniswapV2Router02, amountTokenDesired);
  //   let val = await cc.allowance(owner.address, IUniswapV2Router02);
  //   console.log(val.toString());

  //   await cc.connect(owner).approve(IUniswapV2Router02, amountTokenDesired);

  //   // await cc.approve(contract.address, ethers.utils.parseEther("1"));
  //   // let bal = await cc.allowance(owner.address, contract.address);
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
  //     cc.address,
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
