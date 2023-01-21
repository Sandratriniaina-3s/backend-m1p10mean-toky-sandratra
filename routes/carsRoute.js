const express = require("express");
const carsController = require("../controllers/carsController");
const router = express.Router();

router.route("/").post(carsController.addCar).get(carsController.getAllCars);
router
  .route("/:id")
  .get(carsController.getCarById)
  .put(carsController.updateCar)
  .delete(carsController.deleteCar);

module.exports = router;
