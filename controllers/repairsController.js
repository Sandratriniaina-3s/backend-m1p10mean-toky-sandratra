var repairsService = require('../services/repairsService');

const addRepair = async function (req, res, next){
    try {
        const repair = await repairsService.addRepair(req.body);
        res.json({ data: repair.value, message: "Ressource created"});
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
        const repair = await repairsService.updateRepair(req.params.id, req.body);
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

module.exports = {
    addRepair,
    getAllRepairs,
    getRepairById,
    updateRepair,
    deleteRepair
}