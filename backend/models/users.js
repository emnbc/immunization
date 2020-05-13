const db = require('../shared/db');
const ObjectID = require('mongodb').ObjectID;

exports.auth = (auth, cb) => {
    db.get().collection('users').findOne(auth, (err, doc) => {
        setTimeout(() => { // fake server dalay 
            cb(err, doc);
        }, 250);
    });
}

exports.all = (sorting, cb) => {
    let query = db.get().collection('users');
    let { sort, size, skip, search } = sorting;
    query.countDocuments().then(count => {
        query.find(...search).project({ password : 0 }).sort(sort).skip(skip).limit(size).toArray((err, docs) => {
            setTimeout(() => { // fake server dalay 
                cb(err, {docs: docs, count: count});
            }, 250);
        });
    });
}

exports.getMe = (username, cb) => {
    db.get().collection('users').findOne({ username: username }, (err, doc) => {
        cb(err, doc);
    });
}

exports.create = (user, cb) => {
    db.get().collection('users').findOne({ username: user.username }, (err, doc) => {
        if(doc) {
            cb({ code: 409, error: 'User alrady exist' }, null);
        } else {
            db.get().collection('users').insertOne(user, (err, result) => {
                setTimeout(() => { // fake server dalay 
                    cb(err, result);
                }, 250);
            });
        }
    });
}

exports.update = (id, user, cb) => {
    db.get().collection('users').findOne({ username: user.username }, (err, doc) => {
        if(doc) {
            cb({ code: 409, error: 'User alrady exist' }, null);
        } else {
            db.get().collection('users').updateOne(
                { _id: ObjectID(id) }, { $set: user}, (err, result) => {
                    setTimeout(() => { // fake server dalay 
                        cb(err, result);
                    }, 250);
                }
            );
        }
    });
}



exports.test = (cb) => {
    let query = db.get().collection('mem');
    query.countDocuments().then(count => {
        query.aggregate([
            {
              $lookup:
                {
                  from: "orders",
                  localField: "name",
                  foreignField: "mem",
                  as: "orders"
                }
            },
            {
                $unwind: "$orders"
            },
            {
                $lookup:
                {
                    from: "fruit",
                    localField: "orders.product",
                    foreignField: "code",
                    as: "orders.fruit"
                }
            },
            {
                $group: {
                    "_id": "$_id",
                    "name": {
                        "$first": "$name"
                    },
                    "orders": {
                        "$push": "$orders"
                    }
                }
            },
            {   
                $project: {
                    _id : 1,
                    name : 1,
                    orders: {
                        _id: 1,
                        product: 1,
                        quantity: 1,
                        fruit: { name: 1}
                    }
                } 
            }
         ]).toArray((err, docs) => {
            cb(err, docs);
        });
    });
}



// exports.test = (cb) => {
//     let query = db.get().collection('mem');
//     query.countDocuments().then(count => {
//         query.find().toArray((err, memRes) => {

//             for(let i = 0; i < memRes.length; i++) {
//                 db.get().collection('orders').aggregate([
//                     {
//                         $match: {
//                             mem: memRes[i].name
//                         }
//                     },
//                     {
//                         $lookup:
//                             {
//                                 from: "fruit",
//                                 localField: "product",
//                                 foreignField: "code",
//                                 as: "fruit"
//                             }
//                     }, 
//                     {   
//                         $project:{
//                             _id : 1,
//                             quantity : 1,
//                             product: 1,
//                             fruitName: { $arrayElemAt: [ "$fruit.name", 0 ] }
//                         } 
//                     }
//                 ]).toArray((err, orderRes) => {
//                     memRes[i].order = orderRes;
//                     if(memRes.length - 1 == i) {
//                         cb(err, memRes);
//                     }
//                 });
//             }

//         });
//     });
// }

// exports.test = (cb) => {
//     let query = db.get().collection('mem');
//     query.countDocuments().then(count => {
//         query.aggregate([
//             {
//               $lookup:
//                 {
//                   from: "orders",
//                   localField: "name",
//                   foreignField: "mem",
//                   as: "orders"
//                 }
//             }
//          ]).toArray((err, docs) => {

//             cb(err, docs);
//         });
//     });
// }