var profitService = require('../services/profitsService');

const addProfit = async function (req, res, next){
    try {
        const profit = await profitService.addProfit(req.body);
        res.json({ data: profit.value, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllProfits = async function (req, res, next){
    const {search} = req.query;
    try {
        const profits = await profitService.getAllProfit(search);
        res.json({ data: profits, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getProfitById = async function (req, res, next){
    try {
        const profit = await profitService.getProfitById(req.params.id);
        res.json({ data: profit, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updateProfit = async function (req, res, next){
    try {
        const profit = await profitService.updateProfit(req.params.id, req.body);
        res.json({ data: profit, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deleteProfit = async function (req, res, next){
    try {
        const profit = await profitService.deleteProfit(req.params.id);
        res.json({ data: profit.value, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addProfit,
    getAllProfits,
    getProfitById,
    updateProfit,
    deleteProfit
}