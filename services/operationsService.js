const client = require('../config/dbConnection').client;
const collectionName = 'operations';
const ObjectId = require('mongodb').ObjectId; 
const operationSearchFields = ['label'];

const addOperation = async function (operation){
    const db = await client;
    return await db.collection(collectionName).insertOne(operation);
}

const getAllOperation = async function (search){
    const db = await client;
    return await db.collection(collectionName).find(search !== '' ? {
        $or: operationSearchFields.map((field) => ({
            [field]: { $regex: `${search}`, $options: 'i' },
        })),
    } : {}).toArray();
}

const getOperationById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updateOperation = async function (id, operation){
    objId = new ObjectId(id)
    const {_id, ..._operation} = operation;
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:_operation}, {upsert:true});
}

const deleteOperation = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addOperation,
    getAllOperation,
    getOperationById,
    updateOperation,
    deleteOperation
}


