var voitureService = require('../services/voitureService');

const addVoiture = async function (req, res){
    console.log(req)
    try {
        const voiture = await voitureService.addVoiture(req.body);
        res.json({ data: voiture.value, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllVoiture = async function (req, res){
    try {
        const voiture = await voitureService.getAllVoiture();
        res.json({ data: voiture, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getVoitureById = async function (req, res){
    try {
        const voiture = await voitureService.getVoitureById(req.params.id);
        res.json({ data: voiture, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updateVoiture = async function (req, res){
    try {
        const voiture = await voitureService.updateVoiture(req.params.id, req.body);
        res.json({ data: voiture, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deleteVoiture = async function (req, res){
    try {
        const voiture = await voitureService.deleteVoiture(req.params.id);
        res.json({ data: voiture.value, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addVoiture,
    getAllVoiture,
    getVoitureById,
    updateVoiture,
    deleteVoiture
}