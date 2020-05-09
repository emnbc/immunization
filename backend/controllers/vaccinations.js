const Vaccinations = require('../models/vaccinations');
const ObjectID = require('mongodb').ObjectID;

exports.findByPatientId = (req, res) => {
    Vaccinations.findByPatientId(req.query.patientId, req.sorting, (err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.header('X-Total-Count', docs.count);
        res.send(docs.docs);
    });
}

exports.create = (req, res) => {
    let vaccination = {
        patientId: ObjectID(req.body.patientId),
        vaccineId: ObjectID(req.body.vaccineId),
        agree: req.body.agree,
        status: req.body.status,
        createdDate: new Date()
    };
    Vaccinations.create(vaccination, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(vaccination);
    });
}

exports.update = (req, res) => {
    let vaccination = {
        vaccineId: ObjectID(req.body.vaccineId),
        agree: req.body.agree,
        status: req.body.status
    }
    Vaccinations.update(req.params.id, vaccination, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(vaccination);
    });
}