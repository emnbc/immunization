const db = require('../shared/db');

exports.register = (sorting, cb) => {
    let query = db.get().collection('patients');
    let date = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1, 0, 0, 0);
    query.find(
        {
            registerDate: {
                $gte: new Date(date),
                $lte: new Date()
            }
        }, 
        {
            registerDate: 1
        }
    ).sort({ registerDate: 1 }).toArray((err, docs) => {
        cb(err, docs);
    });
}

exports.gender = (cb) => {
    let query = db.get().collection('patients');
    query.countDocuments({sex: 1}).then((countMale) => {
        query.countDocuments({sex: 2}).then((countFemale) => {
            cb([{name: "Male", value: countMale}, {name: "Female", value: countFemale}]);
        });
    });
}