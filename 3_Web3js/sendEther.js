const { Web3 } = require("web3");

async function sendEther() {
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"); // connected to blockchain
  const web3 = new Web3(provider);

  const transact = await web3.eth.sendTransaction({
    from: "0x61B7e0241e3C624b37C5Ee4A7Abd4dDf44121ce4",
    to: "0x6adF190EA90E17B75bD6822a819e1922C83d837C",
    value: web3.utils.toWei("10", "ether"),
  });
  console.log(transact);
}
sendEther();
