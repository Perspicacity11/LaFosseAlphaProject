const User = require("../models/user_models")

async function index(req, res) {
    try {
        const user = await User.getAll()
        res.status(200).json(user)
    } catch(err){
        res.status(500).json({ error: err.message})
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await User.getOneById(id)
        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        console.log("incoming signup payload", req.body);
        const data = req.body
        const user = await User.create(data)
        res.status(201).json(user)
    } catch(err) {
        res.status(404).json({ error: err.message})
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const user = await User.getOneById(id)
        const result = await user.update(data)
        res.status(200).json(result)
    } catch(err) {
        res.status(404).json({ error: err.message})
    }
}

async function destroy(req, res) {
    try{
    const id = parseInt(req.params.id)
    const user = await User.getOneById(id)
    const result = await user.destroy({id})
    res.status(204).json(result)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    index, show, create, update, destroy
}








