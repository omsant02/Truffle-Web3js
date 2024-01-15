import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { useState, useEffect, startTransition } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState("nil");

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // to interact with a sm we require
      // - Abi
      // - contract address
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];

      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      ); // instance of our contract
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;

    async function readData() {
      const data = await contract.methods.getter().call(); // reading on blockchain - .call()
      console.log(Number(data));
      setData(Number(data));
    }
    contract && readData();
  }, [state]);

  async function writeData() {
    const { contract } = state;
    const data = document.querySelector("#value").value;

    await contract.methods
      .setter(data)
      .send({ from: "0x3a3a2892a7Bba5504a8Ce6c1c0D9196e9247f684" }); // writting on blockchain - .send()
    window.location.reload();
  }

  return (
    <>
      <h1>Welcome to Dapp</h1>
      <div className="App">
        <p className="text">Contract Data : {data}</p>
        <div>
          <input type="text" id="value" required="required"></input>
        </div>

        <button onClick={writeData} className="button button2">
          Change Data
        </button>
      </div>
    </>
  );
}

export default App;
