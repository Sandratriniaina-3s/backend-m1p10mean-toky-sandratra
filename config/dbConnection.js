const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb+srv://sandratra:kljfelw54QzaA@cluster0.91lx4lh.mongodb.net/?retryWrites=true&w=majority";
const URL_TEST = "mongodb://127.0.0.1/garage"
const mongoClient = new MongoClient(URL);

/*
const DB_USER = 'toky-sandratra';
const DB_PASSWORD = 'tokysandratra';
const DB_NAME = 'garage-mean';
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.bso1tcr.mongodb.net/?retryWrites=true&w=majority`;
*/

const client = (async() => {
    await mongoClient.connect();
    console.log("Successfully connected");
    return await mongoClient.db("garage");
})();

module.exports = { client };