const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const app = express();
const connectionString = require('../config');

app.use(bodyParser.json());
app.use(cors());

massive(connectionString).then(db => {
    app.set('db', db);
    app.get('db').init.seed_file().then(res => {
        console.log(res);
    })
})

app.get('/api/superheroes', (req, res) => {
    req.app.get('db').getSuperheroes().then(superheroes => {
        res.send(superheroes);
    })
})

app.post('/api/newSuperhero', (req, res) => {
    let { name, power } = req.body;
    req.app.get('db').newSuperhero([name, power]).then(() => {
        res.status(200).send();
    })
})


const port = 3002;
app.listen(port, console.log(`It's lit on port ${port} fam!`));