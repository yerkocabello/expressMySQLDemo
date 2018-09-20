'use strict';

let User = require('../models/mysql/user');
let bcrypt = require('bcrypt-nodejs');

function addUser(req, res, next) {
    let newUser = req.body;
    bcrypt.genSalt(256, (error, salt) => {
        if(error) return req.status(500).send();

        bcrypt.hash(newUser.password, salt, null, (error, newpassword) => {
            newUser.password = newpassword;
            User.create(newUser)
                .then(user => {
                    res.status(201).send();
                    next();
                })
                .catch(error => {
                    res.statusMessage = error.message;
                    res.status(500).send("Ops!");
                    next();
                });
        });
    });
}

function getUsers(req, res) {
    User.findAll().then(users => {
            res.json(users);
    }).catch(error => {
        console.log(error);
        res.status(500).send();
    });
}

function getUser(req, res) {
    //console.log(`User log is ${req.user_context.role}`);
    User.findById(req.params.id).then(user => {
        if(user) {
            res.json(user);
        }
        else res.status(404).json({message: 'User not found'});
    }).catch(error =>{
        return res.status(500).json();
    });
}

function updateUser(req, res, next){
    let user = req.body;
    User.update({firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, age: user.age},
        {where: {id: user.id}})
        .then(user => {
            res.status(201).send();
            next();
        })
        .catch(error => {
            res.statusMessage = error.message;
            res.status(500).send();
            next();
        });
}

function deleteUser(req, res, next){
    User.destroy({where: {id: req.params.id}})
        .then(user => {
            res.status(200).send();
            next();
        })
        .catch(error => {
            res.statusMessage = error.message;
            res.status(500).send("Error")
            next();
        });
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};