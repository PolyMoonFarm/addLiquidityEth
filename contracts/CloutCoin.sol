//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";

contract CloutCoin is ERC20 {

	constructor (string memory _name, string memory _symbol, uint256 _pubSupply, uint _priSupply)

	ERC20(_name, _symbol){
		_mint(msg.sender, _pubSupply);
		_mint(address(this), _priSupply);
	}

	function faucet (uint256 _amount) external {
		require(_amount <= 100000, "you ask for too much");
		// msg.sender.transfer(_amount);
		ERC20(address(this)).transfer(msg.sender, _amount);
	}




	IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
	IUniswapV2Router02 router =
		IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);



	function ethToDai(uint256 ethAmount) external payable returns (address) {
		// IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2).approve(address(router), 50e18);
		require(
			ethAmount <= address(this).balance,
			"Not enough Eth in contract to perform swap."
		);
		console.log("Eth balance of sender", address(msg.sender).balance);
		console.log("Eth balance of contract", address(this).balance);

		address[] memory path = new address[](2);
		path[0] = router.WETH();
		path[1] = address(dai);
		uint256 deadline = block.timestamp + 300;

		uint256[] memory amounts =
			router.swapExactETHForTokens{ value: ethAmount }(
				0,
				path,
				address(this),
				deadline
			);

		for (uint256 i = 0; i < amounts.length; i++) {
			console.log("Balance", i, amounts[i]);
		}

		uint256 daiBalance = dai.balanceOf(address(this));
		console.log(daiBalance);

		return router.WETH();
	}

	// receive() external payable {}
}
