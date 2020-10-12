const { backedUpFiles } = require('./fresh');
const db = require('diskdb');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    res.json(db.coffeeorders.find());
});

app.post('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    try {
        db.coffeeorders.save(req.body);
        res.sendStatus(201);
    } catch (e) {
        console.log(`API error: ${e}`);
        res.sendStatus(500);
    }
});

app.delete('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    backedUpFiles()
        .then(() => {
            res.sendStatus(200);
        });
});

// email routes.
app.get('/coffeeorders/coffee/:coffee', (req, res) => {
    const coffee = req.params.coffee;
    console.log(`looking for: ${coffee}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { coffee: coffee});
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.get('/coffeeorders/emailAddress/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress;
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { emailAddress: emailAddress});
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.get('/coffeeorders/size/:size', (req, res) => {
    const size = req.params.size;
    console.log(`looking for: ${size}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { size: size });
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.get('/coffeeorders/flavor/:flavor', (req, res) => {
    const flavor = req.params.flavor;
    console.log(`looking for: ${flavor}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { flavor: flavor});
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.get('/coffeeorders/strength/:strength', (req, res) => {
    const strength = req.params.strength;
    console.log(`looking for: ${strength}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { strength: strength});
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.put('/coffeeorders/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress;
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { emailAddress: emailAddress } );
    console.log(`PUT: ${JSON.stringify(record,null,2)}`);
    if (record) {
        try {
            req.body._id = record._id;
            db.coffeeorders.remove({ _id: record._id });
            setTimeout(() => {
                db.coffeeorders.save(req.body);
                res.status(200).json(req.body);
            }, 200);
        } catch (e) {
            res.status(500).json({"error": `${e}`});
        }
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/coffee/:coffee', (req, res) => {
    const coffee = req.params.coffee;
    console.log(`looking for: ${coffee}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { coffee:coffee } );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/emailAddress/:emailAddress', (req, res) => {
    const emailAddress = req.params.emailAddress;
    console.log(`looking for: ${emailAddress}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { emailAddress: emailAddress} );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/size/:size', (req, res) => {
    const size = req.params.size;
    console.log(`looking for: ${size}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { size: size} );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/flavor/:flavor', (req, res) => {
    const flavor = req.params.flavor;
    console.log(`looking for: ${flavor}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { flavor: flavor} );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});

app.delete('/coffeeorders/strength/:strength', (req, res) => {
    const strength = req.params.strength;
    console.log(`looking for: ${strength}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { strength: strength} );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.sendStatus(200);
    }
    else res.sendStatus(404);
});



 
app.listen(3000);