const jwt = require('jsonwebtoken');

exports.verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.redirect('/login');
    }
};

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).send('Forbidden');
        next();
    };
};
