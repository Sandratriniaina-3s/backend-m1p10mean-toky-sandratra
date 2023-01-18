const express = require('express');
const operationController = require('../controllers/operationsController');
const router = express.Router();

router.route("/")
      .post(operationController.addOperation)
      .get(operationController.getAllOperations);
router.route("/:id")
      .get(operationController.getOperationById)
      .put(operationController.updateOperation)
      .delete(operationController.deleteOperation);

module.exports = router ;