const express = require('express');
const repairController = require('../controllers/repairsController');
const router = express.Router();

router.route("/car")
        .get(repairController.getRepairsByCar);
router.route('/dashboard')
        .get(repairController.getDashboardData);
router.route('/mail')
        .post(repairController.sendMail);
router.route('/unpaid')
        .get(repairController.getAllUnpaidRepairs);
router.route("/")
        .post(repairController.addRepair)
        .get(repairController.getAllRepairs);
router.route("/:id")
        .get(repairController.getRepairById)
        .put(repairController.updateRepair)
        .delete(repairController.deleteRepair);
router.get("/status/:status", repairController.getRepairsStatusDeposited);
router.get("/supervisor/:id", repairController.getRepairBySupervisor);
router.get("/finished/supervisor/:id", repairController.getRepairsTerminatedBySupervisor);
router.put("/:id/operation", repairController.updateRepairAndStart);
router.get("/detail/:id", repairController.getRepairDetailsById);

module.exports = router ;