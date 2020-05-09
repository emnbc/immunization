const db = require('../shared/db');
const ObjectID = require('mongodb').ObjectID;

exports.findByPatientId = (id, sorting, cb) => {
    let query = db.get().collection('vaccinations');
    let { sort, size, skip } = sorting;
    query.countDocuments().then(count => {
        query.aggregate([
            {
                $match: {
                    patientId: ObjectID(id)
                }
            },
            {
                $lookup: {
                    from: "vaccine",
                    localField: "vaccineId",
                    foreignField: "_id",
                    as: "vaccine"
                }
            },
            {
                $unwind: "$vaccine"
            },
            {
                $project:{
                    _id: 1,
                    patientId: 1,
                    vaccineId: 1,
                    agree: 1,
                    status: 1,
                    createdDate: 1,
                    vaccineName: "$vaccine.name"
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

exports.create = (vaccination, cb) => {
    db.get().collection('vaccinations').insertOne(vaccination, (err, result) => {
        setTimeout(() => { // fake server dalay 
            cb(err, result);
        }, 250);
    });
}

exports.update = (id, vaccination, cb) => {
    db.get().collection('vaccinations').updateOne(
        { _id: ObjectID(id) }, { $set: vaccination }, (err, result) => {
            setTimeout(() => { // fake server dalay 
                cb(err, result);
            }, 250);
        }
    );
}