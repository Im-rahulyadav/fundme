// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract MultiFunction {
    uint256 private counter;

    mapping(address => uint256) private userBalances;

    event CounterUpdated(uint256 newValue);

    event Deposit(address indexed user, uint256 amount);

    event Withdrawal(address indexed user, uint256 amount);

    constructor() {
        counter = 0;
    }

    function incrementCounter() external {
        counter += 1;

        emit CounterUpdated(counter);
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }

    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");

        userBalances[msg.sender] += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");

        userBalances[msg.sender] -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");

        require(success, "Transfer failed");

        emit Withdrawal(msg.sender, amount);
    }

    function getBalance() external view returns (uint256) {
        return userBalances[msg.sender];
    }
}
