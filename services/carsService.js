const client = require('../config/dbConnection').client;
const collectionName = 'cars';
const ObjectId = require('mongodb').ObjectId; 

const addCar = async function (car){
    const db = await client;
    return await db.collection(collectionName).insertOne(car);
}

const getAllCars = async function (){
    const db = await client;
    return await db.collection(collectionName).find().toArray();
}

const getCarById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const updateCar = async function (id, car){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:car}, {upsert:true});
}

const deleteCar = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}


