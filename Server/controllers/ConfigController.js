const db = require('../models');
var jwt = require('jsonwebtoken');

const Config = db.configs;

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
    login
};