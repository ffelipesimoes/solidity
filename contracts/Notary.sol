pragma solidity ^0.5.4;
contract Notary {
    struct Record {
        uint256 mineTime;
        uint256 blockNumber;
    }
    address payable dono = msg.sender;
    modifier apenasDono {
        require(msg.sender == dono, "Apenas o dono!");
        _;
    }

    mapping(bytes32 => Record) private docHashes;

    function addDocHash(bytes32 hash) public payable {
        require(msg.value >= 0.0001 ether, "Valor insuficiente");
        Record memory newRecord = Record(now, block.number);
        docHashes[hash] = newRecord;
    }
    function findDocHash(bytes32 hash) public view returns (uint256, uint256) {
        return (docHashes[hash].mineTime, docHashes[hash].blockNumber);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function sacar() public apenasDono {
        uint256 amount = address(this).balance;
        dono.transfer(amount);
    }

    function getOwner() public view returns (address owner) {
        return dono;
    }
}
