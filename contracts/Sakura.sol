// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sakura is ERC20 {
    constructor() ERC20("Sakura", "SKR") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }
}
