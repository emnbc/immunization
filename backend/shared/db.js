const MongoClient = require('mongodb').MongoClient;

let state = {
    db: null
};

module.exports = {

    connect(url, done) {
        if(state.db) {
            return done();
        }
    
        MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            if(err) {
                return done(err);
            }
            state.db = client.db('express');
            done();
        });
    },

    get() {
        return state.db;
    }

}