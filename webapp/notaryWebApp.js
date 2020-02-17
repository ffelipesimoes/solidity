var contract = undefined;
var customProvider = undefined;
var address = "0x6A4494ed32ce0Ab8004fbEAdac534916f88C8d3E";
var abi = undefined;

function notary_init() {
    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use existing gateway
        window.web3 = new Web3(web3.currentProvider);
    } else {
        alert("No Ethereum interface injected into browser. Read-only access");
    }

    

    //contract abi
     abi =[
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "name": "addDocHash",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "sacar",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "name": "findDocHash",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    contract = new web3.eth.Contract(abi, address);
};

//sends a hash to the blockchain
function notary_send(hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
        contract.methods.addDocHash(hash).send({
            from: accounts[0]
        }, function (error, tx) {
            if (error) callback(error, null);
            else callback(null, tx);
        });
    });
};

//looks up a hash on the blockchain
function notary_find(hash, callback) {
    contract.methods.findDocHash(hash).call(function (error, result) {
        if (error) callback(error, null);
        else {
            let resultObj = {
                mineTime: new Date(result[0] * 1000),
                blockNumber: result[1]
            }
            callback(null, resultObj);
        }
    });
};