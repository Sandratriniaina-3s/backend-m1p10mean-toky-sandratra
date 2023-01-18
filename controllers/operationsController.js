var operationsService = require('../services/operationsService');

const addOperation = async function (req, res, next){
    console.log(req)
    try {
        const operation = await operationsService.addOperation(req.body);
        res.json({ data: operation.value, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllOperations = async function (req, res){
    try {
        const operations = await operationsService.getAllOperation();
        res.json({ data: operations, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getOperationById = async function (req, res){
    try {
        const operation = await operationsService.getOperationById(req.params.id);
        res.json({ data: operation, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updateOperation = async function (req, res){
    try {
        const operation = await operationsService.updateOperation(req.params.id, req.body);
        res.json({ data: operation, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deleteOperation = async function (req, res){
    try {
        const operation = await operationsService.deleteOperation(req.params.id);
        res.json({ data: operation.value, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addOperation,
    getAllOperations,
    getOperationById,
    updateOperation,
    deleteOperation
}