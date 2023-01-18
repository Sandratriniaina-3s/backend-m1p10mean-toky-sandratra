const client = require('../config/dbConnection').client;
const collectionName = 'voiture';
const ObjectId = require('mongodb').ObjectId; 

const addVoiture = async function (reqBody){
    const db = await client;
    return await db.collection(collectionName).insertOne(reqBody);
}

const getAllVoiture = async function (){
    const db = await client;
    return await db.collection(collectionName).find().toArray();
}

const getVoitureById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updateVoiture = async function (id, reqBody){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:reqBody}, {upsert:true});
}

const deleteVoiture = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addVoiture,
    getAllVoiture,
    getVoitureById,
    updateVoiture,
    deleteVoiture
}


