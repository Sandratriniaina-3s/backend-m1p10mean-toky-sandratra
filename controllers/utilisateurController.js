var utilisateurService = require('../services/utilisateurService');

exports.addUtilisateur = async function (req, res){
    try {
        const utilisateur = await utilisateurService.addUtilisateur(req.body);
        res.json({ data: utilisateur, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}