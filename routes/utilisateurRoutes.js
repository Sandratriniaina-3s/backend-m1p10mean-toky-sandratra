const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');
const router = express.Router();

router.route("/").post(utilisateurController.addUtilisateur);

module.exports = router ;