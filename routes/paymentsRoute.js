const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const router = express.Router();

router
  .route("/")
  .post(paymentsController.addPayment)
  .get(paymentsController.getAllPayments);
router
  .route("/:id")
  .get(paymentsController.getPaymentById)
  .put(paymentsController.updatePayment)
  .delete(paymentsController.deletePayment);

module.exports = router;
