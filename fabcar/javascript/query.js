
'use strict';

const { Contract } = require('./fabric-contract-api');

const dataAsBytes = getState(1); // get the car from chaincode state
if (!dataAsBytes || dataAsBytes.length === 0) {
    throw new Error(`${id} does not exist`);
}
console.log(dataAsBytes.toString());
