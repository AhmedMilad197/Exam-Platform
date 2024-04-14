const db = require('../models');
var jwt = require('jsonwebtoken');

const Config = db.configs;

// 1. Create Config
const addConfig = async (req, res) => {
    try {
        let info = {
            name: req.body.name,
            email: req.body.email,
            nameadmin: req.body.nameadmin,
            password: req.body.password,
            active: req.body.active ? req.body.active : false,
            goals: req.body.goals,
            vision: req.body.vision,
            faccbook: req.body.faccbook,
            phone: req.body.phone,
            address: req.body.address,
        };

        const config = await Config.create(info);
        res.status(200).send(config);
        console.log(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Config
const getAllConfig = async (req, res) => {
    try {
        let configs = await Config.findAll({});
        res.status(200).send(configs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Config
const getOneConfig = async (req, res) => {
    try {
        let id = req.params.id;
        let configs = await Config.findOne({ where: { id: id } });
        if (!configs) {
            return res.status(404).json({ error: 'id not found' });
        }
        res.status(200).send(configs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Config
const updateConfig = async (req, res) => {
    try {
        let id = req.params.id;
        const config = await Config.update(req.body, { where: { id: id } });
        if (config[0] === 0) {
            return res.status(404).json({ error: 'Config not found' });
        }
        res.status(200).send(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Config by id
const deleteConfig = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedConfigCount = await Config.destroy({ where: { id: id } });
        if (deletedConfigCount === 0) {
            return res.status(404).json({ error: 'Config not found' });
        }
        res.status(200).send('Config is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 6. Get published Config
const getPublishedConfig = async (req, res) => {
    try {
        const configs = await Config.findAll({ where: { active: true } });
        res.status(200).send(configs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        let nameadmin = req.body.nameadmin;
        let password = req.body.password;
        if (!nameadmin || !password) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        let config = await Config.findOne({ where: { nameadmin: nameadmin, password: password } });
        if (config != null) {
            jwt.sign({
                user: config,
                role: 'admin',
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, 'loginkey', (err, token) => {
                res.send({
                    admin: config,
                    token: token,
                    role: 'admin'
                });
            });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addConfig,
    getAllConfig,
    getOneConfig,
    updateConfig,
    deleteConfig,
    getPublishedConfig,
    login
};