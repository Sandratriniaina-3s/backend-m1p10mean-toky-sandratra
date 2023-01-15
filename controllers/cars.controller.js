const { getAll } = require("../services/cars.service");

async function getCars(req, res) {
    try {
        const cars = { cars: 'car' };
        res.json(cars);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getCars }