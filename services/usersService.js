const client = require('../config/dbConnection').client;
const collectionName = 'users';

const addUser = async function (user){
    const db = await client;
    return await db.collection(collectionName).insertOne(user);
}

const getAllUsers = async function (){
    const db = await client;
    return await db.collection(collectionName).find().toArray();
}

const getUserById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOne({_id:objId});
}

const getUserByLoginAndPassword = async function (login, password){
    const db = await client;
    return await db.collection(collectionName).findOne({login:login, password:password});
}

const updateUser = async function (id, user){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndUpdate({_id:objId}, {$set:user}, {upsert:true});
}

const deleteUser = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(collectionName).findOneAndDelete({_id:objId});
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByLoginAndPassword,
    updateUser,
    deleteUser
}