//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "./CloutCoin.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TimeLock is Ownable {



	// NEW CODE BEGIN
	// ****************************



	//maintain a balance for companies and influencers
    mapping(address => uint) private companyBal;

	// callled userside from the app
	// requires the user to already have called and set the approve function
	// this function transfers the approved tokens to the timelock contract and sets the company balabce
	function transferToContract(address _company, address _token, uint256 _amount) public returns(bool) {
	    ERC20(_token).transferFrom(_company, address(this), _amount);
	    companyBal[_company] += _amount;
		return true;
    }

	// call userside it permitss a company to see thier current balance
	function getCompanyBal() public view returns(uint256){
		return companyBal[msg.sender];
	}

	// call the cloutcoin contract and set approve for each influencer
	function setInfluencerBal(address _token, address _company, address _influencer, uint256 _amount) public onlyOwner returns(bool){
		ERC20(_token).approve(_influencer, _amount);
		companyBal[_company] -= _amount;
		return true;
	}








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
	// mapping(address => uint) public companyBal;

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
