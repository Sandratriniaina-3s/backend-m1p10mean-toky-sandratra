const client = require('../config/dbConnection').client;
const collectionName = 'profits';
const ObjectId = require('mongodb').ObjectId; 
const profitSearchFields = ['label'];

const addProfit = async function (profit){
    const db = await client;
    return await db.collection(collectionName).insertOne(profit);
}

const getAllProfit = async function (search){
    const db = await client;
    return await db.collection(collectionName).find({}).toArray();
}

const getProfitById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updateProfit = async function (id, profit){
    objId = new ObjectId(id)
    const {_id, ..._profit} = profit;
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:_profit}, {upsert:true});
}

const deleteProfit = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addProfit,
    getAllProfit,
    getProfitById,
    updateProfit,
    deleteProfit
}


