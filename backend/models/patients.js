const db = require('../shared/db');
const ObjectID = require('mongodb').ObjectID;

exports.findById = (id, cb) => {
    db.get().collection('patients').findOne({ _id: ObjectID(id) }, (err, doc) => {
        setTimeout(() => { // fake server dalay 
            cb(err, doc);
        }, 400);
    });
}

exports.all = (req, cb) => {
    let query = db.get().collection('patients');
    let { sort, size, skip, search } = req.sorting;
    for(let i = 0; i < search.length; i++) {
        if(search[i]['sex']) search[i]['sex'] = +req.query.sex;
    }
    query.countDocuments(...search).then(count => {
        query.aggregate([
            {
                $match: { $and: search }
            },
            {
                $lookup: {
                    from: "vaccinations",
                    localField: "_id",
                    foreignField: "patientId",
                    as: "vaccination"
                }
            },
            {
                $unwind: {
                    path: "$vaccination",
                    preserveNullAndEmptyArrays: true
                 }
            },
            {
                $group: {
                    _id: "$_id",
                    firstName: { $first: "$firstName" },
                    lastName: { $first: "$lastName" },
                    birthDate: { $first: "$birthDate" },
                    sex: { $first: "$sex" },
                    phone: { $first: "$phone" },
                    registerDate: { $first: "$registerDate" },
                    vaccination: { $push: "$vaccination" }
                }
            }, 
            {
                $sort: sort
            },
            {
                $skip: skip
            },
            {
                $limit: size
            }
         ]).toArray((err, docs) => {
            setTimeout(() => { // fake server dalay 
                cb(err, {docs: docs, count: count});
            }, 250);
        });
    });
}

exports.create = (patient, cb) => {
    db.get().collection('patients').insertOne(patient, (err, result) => {
        setTimeout(() => { // fake server dalay 
            cb(err, result);
        }, 250);
    });
}

exports.update = (id, patient, cb) => {
    db.get().collection('patients').updateOne(
        { _id: ObjectID(id) }, { $set: patient}, (err, result) => {
            setTimeout(() => { // fake server dalay 
                cb(err, result);
            }, 250);
        }
    );
}

exports.delete = (id, cb) => {
    db.get().collection('artists').deleteOne(
        { _id: ObjectID(id) },
        (err, result) => {
            cb(err, result);
        }
    );
}