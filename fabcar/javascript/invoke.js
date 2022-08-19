/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var express = require('express')
var app = express()
const port  = 3000
app.use(express.json())
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //await contract.submitTransaction('createCar','101', '{This is info}');
        //console.log('Transaction has been submitted');
        // APIs ----
        
        app.post('/add',(req,res)=>{
            var id = req.body['id']
            var newinfo = req.body['newinfo']
            contract.submitTransaction('adddata',id,newinfo)
            res.json({"Message":"Data has been updated on hyperledger!!!"})
        })
        // async querydata(ctx, id) {
    //     const dataAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
    //     if (!dataAsBytes || dataAsBytes.length === 0) {
    //         throw new Error(`${id} does not exist`);
    //     }
    //     console.log(dataAsBytes.toString());
    //     return dataAsBytes.toString();
    // }





        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
app.listen(port, ()=> {console.log("Running on",port)})
main();
