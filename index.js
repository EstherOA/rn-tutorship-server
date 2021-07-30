const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

MongoClient.connect('mongodb+srv://rnt-server:h1BePXRYEgHxh7Nz@cluster0.6cqi3.mongodb.net/rnt_db?retryWrites=true&w=majority')
.then(client => {
    console.log("Connected to database")
    const db = client.db('rnt_db');
    const moodsCollection = db.collection('moods');

    app.use(bodyParser.urlencoded({extended: true}));
    app.get('/', (req, res) => res.send("Welcome to Turntabl RN Tutorship server"));
    app.get('/ping', (req, res) => res.send("Pong"));

    //CRUD endpoints
    app.get('/moods/read', (req, res) => {
        const cursor = db.collection('moods').find().toArray()
        .then(result => {
            console.log(result);
            res.json({status: 200, message: `Found ${result.length} moods`, body: result});
        }).catch(error => {
            console.log(error);
            res.json({message: error, status: 400, body: {}});
        });
    });

    app.post('/moods/create', (req, res) => {
        console.log(req.body);
        moodsCollection.insertOne(req.body)
        .then(result => {
            console.log(result);
            res.json({status: 200, message: `Added 1 mood`, body: result});
        })
        .catch(error => {
            console.log(error);
            res.json({message: error, status: 400, body: {}});
        });
    });

    app.listen(3000, () => {
        console.log('app running on port 3000');
    });

})
.catch(error => console.error(error));


