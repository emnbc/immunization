const db = require('../shared/db');
const ObjectID = require('mongodb').ObjectID;

exports.all = (sorting, cb) => {
    let query = db.get().collection('vaccine');
    let { sort, size, skip, search } = sorting;
    // let findQuery = null
    // if(search.name) findQuery = { [search.name] : { $regex: new RegExp(search.query, 'gi') }};
    query.countDocuments().then(count => {
        query.find(...search).sort(sort).limit(size).skip(skip).toArray((err, docs) => {
            setTimeout(() => { // fake server dalay
                cb(err, {docs: docs, count: count});
            }, 250);
        });
    });
}

exports.create = (vaccine, cb) => {
    db.get().collection('vaccine').insertOne(vaccine, (err, result) => {
        setTimeout(() => { // fake server dalay 
            cb(err, result);
        }, 250);
    });
}

exports.update = (id, vaccine, cb) => {
    db.get().collection('vaccine').updateOne(
        { _id: ObjectID(id) }, { $set: vaccine }, (err, result) => {
            setTimeout(() => { // fake server dalay 
                cb(err, result);
            }, 250);
        }
    );
}