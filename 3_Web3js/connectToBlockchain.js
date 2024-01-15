const { Web3 } = require("web3");

async function connect() {
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"); // connected to blockchain
  const web3 = new Web3(provider);
  //   console.log(web3);

  // to fetch the account addresses
  const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);

  // to fetch the account balance
  const balanceWei = await web3.eth.getBalance(accounts[0]);
  //   console.log(balanceWei);

  // to convert balance to ether
  const balanceEther = web3.utils.fromWei(balanceWei, "ether");
  //   console.log(balanceEther);

  // to convert balance to wei
  const balanceWei2 = web3.utils.toWei(balanceWei, "ether");
  console.log(balanceWei2);
}
connect();
