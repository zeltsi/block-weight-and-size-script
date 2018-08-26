A simple nodejs script that collects data on block's weight and size.

## Prerequisites
- nodejs 8+
- npm 5+
- Synced bitcoin node

## Install
1. In the project folder type `npm install`. 
2. Inside the index.js file, change the `config` section to match your bitcoin node RPC configuration.

## Run
Run the script using the command `npm run` or `node index.js`.
Once the script completes (it can take up to couple of hours), the data will be stored under `data.csv`.