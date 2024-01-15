const { Web3 } = require("web3");

async function read() {
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"); // connected to blockchain
  const web3 = new Web3(provider);

  const ABI = [
    {
      inputs: [],
      name: "getter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_a",
          type: "uint256",
        },
      ],
      name: "setter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contract = new web3.eth.Contract(ABI, contractAddress);
  //   console.log(contract);

  const data = await contract.methods.getter().call();
  console.log(data);
}
read();
