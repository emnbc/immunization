const Vaccines = require('../models/vaccines');

exports.all = (req, res) => {
    Vaccines.all(req.sorting, (err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.header('X-Total-Count', docs.count);
        res.send(docs.docs);
    });
}

exports.create = (req, res) => {
    let vaccine = {
        name: req.body.name,
        description: req.body.description,
        date: new Date()
    };
    Vaccines.create(vaccine, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(vaccine);
    });
}

exports.update = (req, res) => {
    let vaccine = {
        name: req.body.name,
        description: req.body.description
    };
    Vaccines.update(req.params.id, vaccine, (err, result) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(vaccine);
    });
}