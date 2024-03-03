const jwt = require('jsonwebtoken');

function check(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret", (err, d) => {
            if (err) {
        res.redirect('/login');
            } else {
                console.log(token);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = {check};