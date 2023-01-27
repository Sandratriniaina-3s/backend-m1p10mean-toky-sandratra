const client = require('../config/dbConnection').client;
const collectionName = 'payments';
const ObjectId = require('mongodb').ObjectId; 

const addPayment = async function (payment){
    payment.repair = new ObjectId(payment.repair);
    const db = await client;
    return await db.collection(collectionName).insertOne(payment);
}

const getAllPayments = async function (){
    const db = await client;
    return await db.collection(collectionName)
    .   aggregate([
        {$lookup:{from:'repairs',localField:'repair',foreignField:'_id',as:'repair'}},
        {$lookup:{from:'operations',localField:'repair.operations',foreignField:'_id',as:'operations'}},
        {$lookup:{from:'cars',localField:'repair.car',foreignField:'_id',as:'car'}},
        {$lookup:{from:'users',localField:'repair.supervisor',foreignField:'_id',as:'supervisor'}},
        {$lookup:{from:'users',localField:'car.client',foreignField:'_id',as:'client'}},
        {$unwind : {path: "$car", preserveNullAndEmptyArrays: true}},
        {$unwind : {path: "$supervisor", preserveNullAndEmptyArrays: true}},
        {$unwind : {path: "$client", preserveNullAndEmptyArrays: true}},
    ]).toArray();
}

const getPaymentById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updatePayment = async function (id, payment){
    objId = new ObjectId(id);
    const {_id, ..._payment} = payment;
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:_payment}, {upsert:true});
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


