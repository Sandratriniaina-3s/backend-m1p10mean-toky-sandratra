const client = require('../config/dbConnection').client;
const collectionName = 'cars';
const ObjectId = require('mongodb').ObjectId;

const carSearchFields = ['registration', 'brand'];

const addCar = async function(car) {
    car.client = new ObjectId(car.client);
    const db = await client;
    return await db.collection(collectionName).insertOne(car);
}

const getAllCars = async function(search) {
    const db = await client;
    return await db.collection(collectionName).find(search !== '' ? {
        $or: carSearchFields.map((field) => ({
            [field]: { $regex: `${search}`, $options: 'i' },
        })),
    } : {}).toArray();
}

const getCarById = async function(id) {
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({ _id: objId });
}

const updateCar = async function(id, car) {
    objId = new ObjectId(id);
    car.client = new ObjectId(car.client);
    const {_id, ..._car} = car;
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _car }, { upsert: true });
}

const deleteCar = async function(id) {
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({ _id: objId });
}

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}