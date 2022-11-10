var express = require('express');
var app = express();
var { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
var https = require('https');
var path = require('path');
var fs = require('fs');
require("dotenv").config();

const workerRoutes = require('./routes/worker_routes');

var port = process.env.PORT || 8080;

console.log(process.env.JWT_AUDIENCE)

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI
    }),
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: [process.env.ALGO]
});

// app.use(jwtCheck);
app.use('/', (req, res) => {
    res.status(200).json({ "it": "works" })
})

app.use('/workers', workerRoutes);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certs', 'pkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
}, app)

sslServer.listen(port, () => console.log(`Secure server listening on port ${port}`))