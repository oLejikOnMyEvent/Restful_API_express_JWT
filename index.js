const express = require('express');

const jwt = require ('jsonwebtoken');

const app = express();

app.get('/', (req,res) => {
    res.json({message:' Welcome to Express'});
});

app.get('/api', (req,res) => {
    res.json({
        message: "Welcome to the API"
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                authData
            });
        }
    });
    });

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'oleg',
        email: 'oleg@kOHb.com'
    }
    jwt.sign({user: user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    } );
});

// verify tokern
function verifyToken(req, res, next){
    // get auth header value
    const bearearHeader = req.headers['Authorization'];

    if (typeof bearearHeader !== 'undefined'){

        const bearer = bearearHeader.split('');

        const bearerToken = bearer[1];
        req.token =bearerToken;
        next();
    } else  {
        res.sendStatus(403);
    }

}
app.listen(3000, () => console.log('Server started on 3000 port'));
