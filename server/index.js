const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJwt = require('express-jwt');
const { isRevokedToken } = require('./logout.service');
const jwtSecret = process.env.JWT_SECRET;
const { getTokenByRequest }  = require('./parse-token.service');

function isRevokedCallback(req, payload, done){
  const token = getTokenByRequest(req);
  return done(null, isRevokedToken(token));
};

const jwtMiddleWare = expressJwt({
  secret: jwtSecret,
  isRevoked: isRevokedCallback
}).unless({path: ['/token', '/login']})

let app = express();
app.use(cors());
app.use(jwtMiddleWare);
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

require('./routes/phonebook-routes')(app);
require('./routes/login-routes')(app, jwtSecret);
app.get('/get-user', (req, res) => {
  const { name } = req.user;
  res.send({ name });
});

app.listen(PORT, () => {
  console.log('server started at 8080');
});