'use strict';

let User = require('../models/mysql/user');
let Role = require('../models/mysql/role');

let Jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');

const JwtConfig = require('../config/jwt.json');

function getToken(req, res) {
    console.log('req.body: '+req.body.username);
    User.findOne({
            where: {
                username: req.body.username
            },
            include: [{
                model: Role,
                required: true //inner join, si es falso hara un left outer join
            }]
        })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (errorCompare, isCorrectPassword) => {
                if (errorCompare) return res.status(500).send();

                if(user && isCorrectPassword) {
                    res.json({access_token: createToken(user)});
                } else {
                    res.status(400).json({message: 'Username or Password are invalid'});
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        });
}

function createToken(user) {
    return Jwt.sign({
        role: user.role.name,
        sub: user.username,
        exp: Math.floor(Date.now() / 1000) + (60 * JwtConfig.duration),
    }, JwtConfig.secretKey);
}


module.exports = {
    getToken
};