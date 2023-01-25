const client = require('../config/dbConnection').client;
const repairsCollection = 'repairs';
const paymentsCollection = 'payments';
const carsCollection = 'cars';
const ObjectId = require('mongodb').ObjectId; 

const addRepair = async function (repair){
    const db = await client;
    return await db.collection(repairsCollection).insertOne(repair);
}

const getAllRepairs = async function (){
    const db = await client;
    return await db.collection(repairsCollection).find().toArray();
}

const getRepairsByCar = async function (carId){
    const db = await client;
    return await db.collection(repairsCollection).find({car:new ObjectId(carId)}).toArray();
}

const getRepairById = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(repairsCollection).findOne({_id:objId});
}

const updateRepair = async function (id, repair){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(repairsCollection).findOneAndUpdate({_id:objId}, {$set:repair}, {upsert:true});
}

const deleteRepair = async function (id){
    objId = new ObjectId(id)
    const db = await client;
    return await db.collection(repairsCollection).findOneAndDelete({_id:objId});
}

const getDailyTurnover = async function(){
    const db = await client;
    const today = new Date();
    const dailyPayments = await db.collection(paymentsCollection).find({createdAt:{$gte:today.setHours(0,0,0), $lte:today.setHours(23,59,59)}}).toArray();
    return dailyPayments.map((elem)=>elem.amount).reduce((acc,curr)=> acc + curr , 0)
}

const getMonthlyTurnover = async function(){
    const db = await client;
    const today = new Date();
    const dailyPayments = await db.collection(paymentsCollection)
                                .find(
                                    {
                                        createdAt:{
                                            $gte:new Date(today.getFullYear(), today.getMonth(),1), $lte:new Date(today.getFullYear(), today.getMonth() + 1,0)
                                        }
                                        }
                                    ).toArray();
    return dailyPayments.map((elem)=>elem.amount).reduce((acc,curr)=> acc + curr , 0)
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds,
    )}`;
  }

const getAverageRepairTime = async function () {
    const db = await client;
    const finishedRepairs = await db.collection(repairsCollection).find({status:'Arecuperer'}).toArray();   
    const times = [];
    for(const item of finishedRepairs){
        times.push((new Date(item.reparationBegin).getTime() - new Date(item.finishedAt).getTime));
    }
    const average = times.reduce((acc,curr)=> acc + curr, 0);
    return convertMsToTime(average);
}

const getOnGoingRepairsCount = async function(){
    const db = await client;
    return db.collection(repairsCollection).countDocuments({status:{$nin:["Depose","Arecuperer"]}});
}

const getUnpaidRepairs = async function(){
    const db = await client;
    return db.collection(repairsCollection).countDocuments({paymentStatus:'Non paye'});
}


const getDashboardData = async function(){
    return {
        dailyTurnover: await getDailyTurnover(),
        monthlyTurnover:await getMonthlyTurnover(),
        averageRepairTime:await getAverageRepairTime(),
        onGoingRepairs:await getOnGoingRepairsCount(),
        unpaidRepairs:await getUnpaidRepairs(),
    }
}

module.exports = {
    addRepair,
    getAllRepairs,
    getRepairById,
    updateRepair,
    deleteRepair,
    getRepairsByCar,
    getDashboardData
}


