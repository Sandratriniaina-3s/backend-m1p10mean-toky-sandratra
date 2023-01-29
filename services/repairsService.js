const client = require('../config/dbConnection').client;
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const repairsCollection = 'repairs';
const paymentsCollection = 'payments';
const carsCollection = 'cars';
const user = "m1p10mean.toky.sandratra@gmail.com";
const pass = "zffpkmlahsxhhtfy";
const ObjectId = require('mongodb').ObjectId; 

const addRepair = async function (repair){
    repair.car = new ObjectId(repair.car);
    async function operationId() {
        await repair.operations.forEach((operation,row) => {
            repair.operations.splice(row,1,new ObjectId(operation));
         });
    }
    operationId();
    const db = await client;
    return await db.collection(repairsCollection).insertOne(repair);
}

const getAllRepairs = async function (){
    const db = await client;
    return await db.collection(repairsCollection)
                    .aggregate([
                        {$lookup:{from:'cars',localField:'car',foreignField:'_id',as:'car'}},
                        {$unwind : {path: "$car", preserveNullAndEmptyArrays: true}},
                        {$lookup:{from:'users',localField:'supervisor',foreignField:'_id',as:'supervisor'}},
                        {$unwind : {path: "$supervisor", preserveNullAndEmptyArrays: true}},
                        {$lookup:{from:'users',localField:'car.client',foreignField:'_id',as:'car.client'}},
                        {$unwind : {path: "$car.client", preserveNullAndEmptyArrays: true}},
                        {$lookup:{from:'operations',localField:'operations',foreignField:'_id',as:'operations'}},
                    ]).toArray();
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
    objId = new ObjectId(id);
    repair.supervisor = new ObjectId(repair.supervisor);
    const {_id, ..._repair} = repair;
    const db = await client;
    return await db.collection(repairsCollection).findOneAndUpdate({_id:objId}, {$set:_repair}, {upsert:true});
}

const deleteRepair = async function (id){
    objId = new ObjectId(id);
    const db = await client;
    return await db.collection(repairsCollection).findOneAndDelete({_id:objId});
}

/**Send mail */

const sendMail = async function(repair){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        logger:true,
        auth: {
            user,
            pass
        }
    });

    const mailOptions = {
        from: 'somemail@gmail.com',
        to:'ramananjoelinatokiniaina@gmail.com',
        subject: `Récuperation voiture`,
        text:`Cher client, les reparations sur votre voiture sont terminées`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log('Erreur'+err);
        } else {
            console.log('Succès');
        }
    });
}

/**Dashboard */

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
        const diff =new Date(item.finishedAt).getTime() - new Date(item.reparationBegin).getTime();
        times.push(diff);
    }
    const average = times.reduce((acc,curr)=> acc + curr, 0) / times.length;
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
    getDashboardData,
    sendMail
}


