const express = require('express');
const voitureController = require('../controllers/voitureController');
const router = express.Router();

router.route("/").post(voitureController.addVoiture).get(voitureController.getAllVoiture);
router.route("/:id").get(voitureController.getVoitureById).put(voitureController.updateVoiture).delete(voitureController.deleteVoiture);

module.exports = router ;