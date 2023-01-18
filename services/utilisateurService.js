const client = require('../config/dbConnection').client;
const collectionName = 'utilisateur';

exports.addUtilisateur = async function (reqBody){
    const db = await client;
    return await db.collection(collectionName).insertOne(reqBody);
}