const express = require('express');
const repairController = require('../controllers/repairsController');
const router = express.Router();

router.route("/")
        .post(repairController.addRepair)
        .get(repairController.getAllRepairs);
router.route("/:id")
        .get(repairController.getRepairById)
        .put(repairController.updateRepair)
        .delete(repairController.deleteRepair);

module.exports = router ;