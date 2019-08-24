const jwt = require('jsonwebtoken');
const { logout } = require('../logout.service');
const { getTokenByRequest }  = require('../parse-token.service');

module.exports = (app, jwtSecret) => {
    app.post('/login', (req, res) => {
        const loginInfo = req.body
        if (!(loginInfo.userName === 'abc' && loginInfo.password === 'pass')) {
            throw new Error('not valid user id or password!');
        }
        const user = {
            name: loginInfo.userName
        };
        const token = jwt.sign(user, jwtSecret, {
            expiresIn: 60 * 15
        });
        res.send({
            token
        });
    });

    app.get('/isloggedin', (req, res) => {
        const { name } = req.user;
        res.send({ name });
    });

    app.post('/logout', (req, res) => {
        const token = getTokenByRequest(req)
        if (token) {
            logout(token);
            res.send('ok');
        } else {
            res.status(404).send('not proper auth token')
        }
    });
}