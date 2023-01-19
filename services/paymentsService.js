const client = require('../config/dbConnection').client;
const collectionName = 'payments';
const ObjectId = require('mongodb').ObjectId; 

const addPayment = async function (payment){
    const db = await client;
    return await db.collection(collectionName).insertOne(payment);
}

const getAllPayments = async function (){
    const db = await client;
    return await db.collection(collectionName).find().toArray();
}

const getPaymentById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updatePayment = async function (id, payment){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:payment}, {upsert:true});
}

const deletePayment = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}


