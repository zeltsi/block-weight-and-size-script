const RpcClient = require('bitcoind-rpc');
const Bluebird = require('bluebird');
const fs = require("fs");

// Change the config to match your client configuration.
const config = {
  protocol: 'http',
  user:     'user_name',
  pass:     'password',
  host:     'rpc_ip',
  port:     'rpc_port',
};

let rpc = new RpcClient(config);
Bluebird.promisifyAll(rpc);

// Starting at block number 477120
let starting = 477120;
let ending;

let data = "weight, size, timestamp, block\n";

async function getBlocksData() {
  
  // You can manually insert the last block number.
  let ending = await rpc.getBlockCountAsync();
  console.log("Getting data for blocks ", starting, " - ", ending.result);
  for (let i = starting; i < ending.result; i++){
    let blockHash;
    let block;
    try{
        let res = await rpc.getBlockHashAsync(i);
        blockHash = res.result;
    }catch(err){
      console.log("Error", err);
    }
    
    try{
      block = await rpc.getBlockAsync(blockHash);
      console.log("block:", block.result.height, "/", ending.result);
      data = data + block.result.weight + "," + block.result.size + "," + block.result.time + "," + block.result.height + "\n";
    }catch(err){
      console.log("Error", err);
    }
    
  }
  fs.writeFile("data.csv", data);
}

getBlocksData();