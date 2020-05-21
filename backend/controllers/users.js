const Users = require('../models/users');
const jwt = require("jsonwebtoken");


exports.auth = (req, res) => {
    const auth = {
        username: req.body.username,
        password: req.body.password
    };
    Users.auth(auth, (err, doc) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if(doc) {
            const token = jwt.sign(
                { username: doc.username },
                process.env.IMMSECRETKEY,
                { expiresIn: '10d' }
            );
            res.send({
                token,
                error: null
            });
        } else {
            res.status(401).send({
                token: null,
                error: "Введите правильные имя пользователя/пароль"
            });
        }
    });
}

exports.all = (req, res) => {
    Users.all(req.sorting, (err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.header('X-Total-Count', docs.count);
        res.send(docs.docs);
    });
}

exports.getMe = (req, res) => {
    Users.getMe(req.user.username, (err, doc) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send({ _id: doc._id, username: doc.username, firstName: doc.firstName, lastName: doc.lastName });
    });
}

exports.create = (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        registerDate: new Date()
    };
    Users.create(user, (err, result) => {
        if(err) {
            if(err.code === 409) {
                console.log(err);
                return res.sendStatus(409);
            } else {
                console.log(err);
                return res.sendStatus(500);
            }
        }
        res.send(user);
    });
}

exports.update = (req, res) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate
    };
    if(req.params.id === '5ea094b8ce7d17061cb0957b' || req.params.id === '5e900d08e1f56e128cf1cf56') {
        return res.sendStatus(400);
    }
    Users.update(req.params.id, user, (err, result) => {
        if(err) {
            if(err.code === 409) {
                console.log(err);
                return res.sendStatus(409);
            } else {
                console.log(err);
                return res.sendStatus(500);
            }
        }
        res.send(user);
    });
}

exports.test = (req, res) => {
    Users.test((err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(docs)
        res.send(docs);
    });
}