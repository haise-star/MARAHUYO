const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'mydatabase';
let db;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error(err));

app.get('/', async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.render('index', { users });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    await db.collection('users').insertOne(req.body);
    res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    res.render('edit', { user });
});

app.post('/edit/:id', async (req, res) => {
    await db.collection('users').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect('/');
});
