// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}




// Music sharing

// Life is Music.Music has became the integral part of people's life.
// Our platform allows people to connect and share Music.
// A free platform that allows sharing of music.

// How it works
// ============
// Parties: 
//     - Music uploader: Music creators or platform admin is free to upload music file that is their work.
//         Categories of uploader: 
//             o Artists.
//             o Upcoming artists.
//             o When an artist uploads a song, they exhaust a tiny amount of the platform token i.e burn token.
//             o There is a limited supply of the token. So it is deflationary as it decreases as more music are uploaded.

//         Note: We will install AI softwares that can detect if music has been uploaded before.

//     - Consumers: Music downloaders/consumers. 
//         o Each time a music file is downloaded, the fee/charges is divided among the uploader and the platform.
//         o As a consumer, holding our platform token allows you a significant amount of discount.
