/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        // const cars = [
        //     {
        //         id: "315",
        //         info  : "{This is info}"
        //     },
            // {
            //     color: 'red',
            //     make: 'Ford',
            //     model: 'Mustang',
            //     owner: 'Brad',
            // },
            // {
            //     color: 'green',
            //     make: 'Hyundai',
            //     model: 'Tucson',
            //     owner: 'Jin Soo',
            // },
            // {
            //     color: 'yellow',
            //     make: 'Volkswagen',
            //     model: 'Passat',
            //     owner: 'Max',
            // },
            // {
            //     color: 'black',
            //     make: 'Tesla',
            //     model: 'S',
            //     owner: 'Adriana',
            // },
            // {
            //     color: 'purple',
            //     make: 'Peugeot',
            //     model: '205',
            //     owner: 'Michel',
            // },
            // {
            //     color: 'white',
            //     make: 'Chery',
            //     model: 'S22L',
            //     owner: 'Aarav',
            // },
            // {
            //     color: 'violet',
            //     make: 'Fiat',
            //     model: 'Punto',
            //     owner: 'Pari',
            // },
            // {
            //     color: 'indigo',
            //     make: 'Tata',
            //     model: 'Nano',
            //     owner: 'Valeria',
            // },
            // {
            //     color: 'brown',
            //     make: 'Holden',
            //     model: 'Barina',
            //     owner: 'Shotaro',
            // },
        //];

    //     for (let i = 0; i < cars.length; i++) {
    //         cars[i].docType = 'car';
    //         await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
    //         console.info('Added <--> ', cars[i]);
    //     }
        console.info('============= END : Initialize Ledger ===========');
    }

    async querydata(ctx, id) {
        const dataAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!dataAsBytes || dataAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        //console.log(dataAsBytes.toString());
        return dataAsBytes.toString();
    }

    // async createCar(ctx,id , info) {
    //     console.info('============= START : Create Car ===========');

    //     const car = {
    //         info,   
    //     };

    //     await ctx.stub.putState(id, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : Create Car ===========');
    // }

    // async queryAllCars(ctx) {
    //     const startKey = '';
    //     const endKey = '';
    //     const allResults = [];
    //     for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
    //         const strValue = Buffer.from(value).toString('utf8');
    //         let record;
    //         try {
    //             record = JSON.parse(strValue);
    //         } catch (err) {
    //             console.log(err);
    //             record = strValue;
    //         }
    //         allResults.push({ Key: key, Record: record });
    //     }
    //     console.info(allResults);
    //     return JSON.stringify(allResults);
    // }

    async adddata(ctx, id, newinfo) {
        console.info('============= START : changeCarOwner ===========');

        const dataAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!dataAsBytes || dataAsBytes.length === 0) {
            const data = {
                newinfo   
            };
    
            await ctx.stub.putState(id, Buffer.from(JSON.stringify(data)));
        }
        else{
            const data = JSON.parse(dataAsBytes.toString());
            data.newinfo += "," + newinfo

            await ctx.stub.putState(id, Buffer.from(JSON.stringify(data)));
            console.info('============= END : changeCarOwner ===========');
        }    
    }

}

module.exports = FabCar;