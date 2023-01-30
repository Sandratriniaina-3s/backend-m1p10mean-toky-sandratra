const client = require('../config/dbConnection').client;
const collectionName = 'payments';
const receiptCollection = 'receipts';
const ObjectId = require('mongodb').ObjectId; 

const addPayment = async function (payment){
    payment.repair = new ObjectId(payment.repair);
    const db = await client;
    const newPayment =  await db.collection(collectionName).insertOne(payment);
    const newReceipt = {
        date:new Date(),
        payment: newPayment._id,
        car:payment.repair.car,
        client:payment.repair.client,
        totalAmount:newPayment.amount,
    }
    await db.collection(receiptCollection).insertOne(newReceipt);
    return newPayment;
}

const getAllPayments = async function (){
    const db = await client;
    return await db.collection(collectionName)
    .   aggregate([
        {$lookup:{from:'repairs',localField:'repair',foreignField:'_id',as:'repair'}},
        {$unwind : {path: "$repair", preserveNullAndEmptyArrays: true}},
        {$lookup:{from:'operations',localField:'repair.operations',foreignField:'_id',as:'operations'}},
        {$unwind : {path: "$operations", preserveNullAndEmptyArrays: true}},
        {$lookup:{from:'cars',localField:'repair.car',foreignField:'_id',as:'repair.car'}},
        {$unwind : {path: "$repair.car", preserveNullAndEmptyArrays: true}},
        {$lookup:{from:'users',localField:'repair.supervisor',foreignField:'_id',as:'repair.supervisor'}},
        {$unwind : {path: "$repair.supervisor", preserveNullAndEmptyArrays: true}},
        {$lookup:{from:'users',localField:'repair.car.client',foreignField:'_id',as:'repair.car.client'}},
        {$unwind : {path: "$repair.car.client", preserveNullAndEmptyArrays: true}},
    ]).toArray();
}

const getPaymentById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const getPaymentByRepair =  async function (repairId){
    objId = new ObjectId(repairId)
    const db = await client;
    return await db.collection(collectionName).findOne({repair:objId});
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
    deletePayment,
    getPaymentByRepair
}


