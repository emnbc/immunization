exports.setParams = (req, res, next) => {

    let params = { 
        size: +req.query.size || 10,
        skip: (+req.query.page-1)*+req.query.size || 0,
        search: [],
        sort: {}
    };

    for (key in req.query) {
        if(key !== 'size' && key !== 'page' && key !== 'sort') {
            params.search.push({ [key] : { $regex: new RegExp(req.query[key], 'gi') }});
        }
    }

    if(params.search.length === 0) {
        params.search.push({});
    }

    if(req.query.sort && req.query.sort.split(',').length === 2) {
        if(req.query.sort.split(',')[1] === 'asc') params.sort[req.query.sort.split(',')[0]] = 1;
        if(req.query.sort.split(',')[1] === 'desc') params.sort[req.query.sort.split(',')[0]] = -1;
    } else {
        params.sort['_id'] = -1;
    }

    req.sorting = params;

    next();
};