var usersService = require('../services/usersService');

const addUser = async function (req, res){
    try {
        const user = await usersService.addUser(req.body);
        res.json({ data: user, message: "Ressource created"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getAllUsers = async function (req, res){
    try {
        const users = await usersService.getAllUsers();
        res.json({ data: users, message: "Ressources found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getUserById = async function (req, res){
    try {
        const user = await usersService.getUserById(req.params.id);
        res.json({ data: user, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const getUserByLoginAndPassword = async function (req, res){
    try {
        const user = await usersService.getUserByLoginAndPassword(req.params.login, req.params.password);
        res.json({ data: user, message: "Ressource found"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const updateUser = async function (req, res){
    try {
        const user = await usersService.updateUser(req.params.id, req.body);
        res.json({ data: user, message: "Ressource updated"});
    } catch (err){
        res.json({ error: err.message });
    }
}

const deleteUser = async function (req, res){
    try {
        const user = await usersService.deleteUser(req.params.id);
        res.json({ data: user, message: "Ressource deleted"});
    } catch (err){
        res.json({ error: err.message });
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByLoginAndPassword,
    updateUser,
    deleteUser
}