// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Sakura} from "../src/Sakura.sol";

contract CounterTest is Test {
    Sakura public sakura;

    function setUp() public {
        sakura = new Sakura();
    }

    function test_balance() public view {
        assertEq(sakura.balanceOf(address(this)), 100000000 * 10 ** 18);
    }
}
