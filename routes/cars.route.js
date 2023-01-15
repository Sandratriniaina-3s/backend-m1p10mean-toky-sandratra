const carController = require('../controllers/cars.controller');
const router = require('express').Router();


module.exports = () => {
    router.get('/', carController.getCars);
};