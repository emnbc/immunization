const Analytics = require('../models/analytics');

exports.register = (req, res) => {
    Analytics.register(req.sorting, (err, docs) => {
        
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }

        let bar = [];

        for(let i = 4; i >= 0; i--) {
            let date = new Date();
            bar.push({
                name: new Date(date.setMonth(date.getMonth() - i)).toLocaleString('en-US', { month: 'long' }),
                value: 0
            });
        }

        docs.forEach(e => {
            let month = new Date(e.registerDate).toLocaleString('en-US', { month: 'long' });
            for(let i = 0; ; i++) {
                if(bar[i].name === month) {
                    bar[i].value++;
                    break;
                }
            }
        });
        
        res.send(bar);
    });
}

exports.gender = (req, res) => {
    Analytics.gender((docs) => {
        res.send(docs);
    });
}