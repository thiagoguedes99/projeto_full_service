exports.access = (req, res, next) => {

    let liberados = [
        'http://localhost:4200',
        'http://localhost:8100'
    ]

    let url = req.headers.origin;

    if (liberados.includes(url)) {
        res.setHeader('Access-Control-Allow-Origin', url);
    }

    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    next();
}