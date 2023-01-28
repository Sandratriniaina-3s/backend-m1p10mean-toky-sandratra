var carsService = require('../services/carsService');

const addCar = async function(req, res, next) {
    try {
        const car = await carsService.addCar(req.body);
        res.json({ data: car, message: "Ressource created" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

const getAllCars = async function(req, res, next) {
    const { search , client} = req.query;
    try {
        const cars = await carsService.getAllCars(search , client);
        res.json({ data: cars, message: "Ressources found" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

const getCarById = async function(req, res, next) {
    try {
        const car = await carsService.getCarById(req.params.id);
        res.json({ data: car, message: "Ressource found" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

const updateCar = async function(req, res, next) {
    try {
        const car = await carsService.updateCar(req.params.id, req.body);
        res.json({ data: car, message: "Ressource updated" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

const deleteCar = async function(req, res, next) {
    try {
        const car = await carsService.deleteCar(req.params.id);
        res.json({ data: car, message: "Ressource deleted" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}