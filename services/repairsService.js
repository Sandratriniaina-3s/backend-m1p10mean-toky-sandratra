const client = require('../config/dbConnection').client;
const collectionName = 'repairs';
const ObjectId = require('mongodb').ObjectId; 

const addRepair = async function (repair){
    const db = await client;
    return await db.collection(collectionName).insertOne(repair);
}

const getAllRepairs = async function (){
    const db = await client;
    return await db.collection(collectionName).find().toArray();
}

const getRepairsByCar = async function (carId){
    const db = await client;
    return await db.collection(collectionName).find({car:new ObjectId(carId)}).toArray();
}

const getRepairById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updateRepair = async function (id, repair){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:repair}, {upsert:true});
}

const deleteRepair = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addRepair,
    getAllRepairs,
    getRepairById,
    updateRepair,
    deleteRepair,
    getRepairsByCar
}


