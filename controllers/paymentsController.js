var paymentsService = require('../services/paymentsService');

const addPayment = async function (req, res, next){
    try {
        const payment = await paymentsService.addPayment(req.body);
        res.json({ data: payment, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllPayments = async function (req, res, next){
    try {
        const payments = await paymentsService.getAllPayments();
        res.json({ data: payments, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getPaymentById = async function (req, res,next){
    try {
        const payment = await paymentsService.getPaymentById(req.params.id);
        res.json({ data: payment, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updatePayment = async function (req, res, next){
    try {
        const payment = await paymentsService.updatePayment(req.params.id, req.body);
        res.json({ data: payment, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deletePayment = async function (req, res, next){
    try {
        const payment = await paymentsService.deletePayment(req.params.id);
        res.json({ data: payment, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}