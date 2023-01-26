const express = require('express');
const profitController = require('../controllers/profitsController');
const router = express.Router();

router.route("/")
      .post(profitController.addProfit)
      .get(profitController.getAllProfits);
router.route("/:id")
      .get(profitController.getProfitById)
      .put(profitController.updateProfit)
      .delete(profitController.deleteProfit);

module.exports = router ;