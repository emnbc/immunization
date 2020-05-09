const Patients = require('../models/patients');

exports.findById = (req, res) => {
    Patients.findById(req.params.id, (err, doc) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
}

exports.all = (req, res) => {
    Patients.all(req, (err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.header('X-Total-Count', docs.count);
        res.send(docs.docs);
    });
}

exports.create = (req, res) => {
    let patient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        sex: req.body.sex,
        phone: req.body.phone,
        registerDate: new Date()
    };
    Patients.create(patient, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(patient);
    });
}

exports.update = (req, res) => {
    let patient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        sex: req.body.sex,
        phone: req.body.phone
    };
    Patients.update(req.params.id, patient, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(patient);
    });
}

exports.delete = (req, res) => {
    Patients.delete(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}