//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "./CloutCoin.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TimeLock {

	constructor() {
		companyBal[0x90F79bf6EB2c4f870365E785982E1f101E93b906] += 2000;
	}

	IUniswapV2Router02 router =
		IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

	function makeAddPool(address cc) public payable {
		bool test = IERC20(cc).approve(address(router), 5);
		uint256 bal = IERC20(cc).allowance(address(this), address(router));
		console.log(test);
		console.log(bal);

		router.addLiquidityETH{ value: msg.value }(
			address(cc),
			5,
			5,
			1,
			msg.sender,
			block.timestamp + 100
		);
	}
	// NEW CODE BEGIN




	function transferToMe(address _owner, address _token, uint _amount) public {
      ERC20(_token).transferFrom(_owner, address(this), _amount);
    }

	fallback() external payable {}




	// New CODE END


	// 	function makeAddPool(
	// 	address cloutCoinAddress,
	// 	uint256 amountTokenDesired,
	// 	uint256 amountTokenMin,
	// 	uint256 amountEthMin,
	// 	address to
	// ) public payable {

	//FE : snapshot of points is taken on friday at 6pm for weekly payout
	//Dispute Period of 2 days
	//SC : balances are updated / distributed by excrow contract to the influcer structs
	//SC(Verify) : Array of all additional balances are off to the contract

	//FE LOGIC : If the user balance > 0, create a data strcuture that will be

	//caviots
	//influencers can only widthdraw once a week
	//if widthdrawl date is sunday at 6pm
	//only tasks completed 2 days prior (meaning before friday at 6pm) will be unlockable for in their weekly widthraw

	//companies need to be registered on the BC

	//USERS
	struct Influencer {
		address userAddress; //prob dont need?
		uint256 lastWidthraw;
		uint256 balance;
		//individual company balance ?? could be array or mapping but also dosent need to be a thing either
	}

	struct Company {
		address companyAddress;
		uint256 balance;
		mapping(address => Influencer) companiesInfluencers;
	}

	mapping(address => Influencer) public influencers;
	mapping(address => Company) public companies;
	mapping(address => uint) public companyBal;

	event companyDepositApproved(address, uint256);


	/** @dev Allows comapnies to deposit
	 */
	function companyDeposit(uint _value) public payable {
		require(msg.value >= 1000, "balance entry is too low");

		if (msg.sender == address(0)) {
			companies[msg.sender].companyAddress = msg.sender;
		}

		companies[msg.sender].balance += msg.value;
		emit companyDepositApproved(msg.sender, companies[msg.sender].balance);
	}


	receive() external payable {
		emit companyDepositApproved(msg.sender, companies[msg.sender].balance);
	}

	// function companyDeposit() public payable {
	// 	require(msg.value >= 0.1 ether, "balance entry is too low");

	// 	if (companies[msg.sender].companyAddress == address(0)) {
	// 		companies[msg.sender].companyAddress = msg.sender;
	// 	}

	// 	companies[msg.sender].balance += msg.value;
	// 	emit companyDepositApproved(msg.sender, companies[msg.sender].balance);
	// }

	

	/** @dev Allows influencers to withdraw their balance of ETH
	 * @param amount Withdraw amount in ethers of eth
	 */
	function influencerWithdraw(uint256 amount)
		public
		onlyWidthraw
		returns (uint256)
	{
		require(
			influencers[msg.sender].balance >= amount,
			"you tried to withdraw more than you have"
		);

		(msg.sender).transfer(amount);
		return influencers[msg.sender].balance;
	}

	modifier onlyWidthraw {
		require(
			block.timestamp >= influencers[msg.sender].lastWidthraw + 1 weeks,
			"You've already extracted your balance for this time period"
		);

		if (influencers[msg.sender].balance > 0) {
			_;
		}
	}

	function blockTime() external view returns (uint256) {
		return block.timestamp;
	}
}
