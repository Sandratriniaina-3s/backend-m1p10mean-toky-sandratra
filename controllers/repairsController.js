var repairsService = require('../services/repairsService');

const addRepair = async function (req, res, next){
    try {
        var repair = req.body;
        await repairsService.addRepair(repair);
        res.json({ data: repair, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllRepairs = async function (req, res, next){
    try {
        const repairs = await repairsService.getAllRepairs();
        res.json({ data: repairs, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getRepairsByCar = async function (req, res, next){
    const {carId} = req.query;
    console.log(carId);
    try {
        const repairs = await repairsService.getRepairsByCar(carId);
        res.json({ data: repairs, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getRepairById = async function (req, res, next){
    try {
        const repair = await repairsService.getRepairById(req.params.id);
        res.json({ data: repair, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updateRepair = async function (req, res, next){
    try {
        var repair = req.body;
        await repairsService.updateRepair(req.params.id, repair);
        res.json({ data: repair, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deleteRepair = async function (req, res, next){
    try {
        const repair = await repairsService.deleteRepair(req.params.id);
        res.json({ data: repair.value, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getDashboardData = async function (req, res, next){
    try {
        const dashboardData = await repairsService.getDashboardData(req.params.id);
        res.json({ data: dashboardData, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addRepair,
    getAllRepairs,
    getRepairById,
    updateRepair,
    getRepairsByCar,
    deleteRepair,
    getDashboardData
}