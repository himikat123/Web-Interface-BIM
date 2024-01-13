const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const path = require('path');
const data = require('./data');

app.use(bodyParser.text({ type: "*/*" }));

app.get('/esp/restart', (req, res) => {
    console.log('GET /esp/restart', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post("/esp/saveConfig", (req, res) => {
    console.log('POST /esp/saveConfig', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    let data = req.body.replace('config:', '');
    setTimeout(() => {
        if(data) {
            const configFile = path.join(__dirname, '..', 'public', 'config.json');
            fs.unlinkSync(configFile);
            fs.writeFileSync(configFile, data);
        }
        res.send("OK");
    }, 2000);
});

app.get('/data.json', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(data()));
});

app.get('/esp/bright', (req, res) => {
    console.log('GET /esp/bright', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/sensitivity', (req, res) => {
    console.log('GET /esp/sensitivity', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/dispToggle', (req, res) => {
    console.log('GET /esp/dispToggle', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/brightLimit', (req, res) => {
    console.log('GET /esp/brightLimit', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/color', (req, res) => {
    console.log('GET /esp/color', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/syncClock', (req, res) => {
    console.log('GET /esp/syncClock', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/syncdialog', (req, res) => {
    console.log('GET /esp/syncDialog', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("22:35");
});

app.post('/esp/changePass', (req, res) => {
    console.log('GET /esp/changePass', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post('/esp/fileUpload', (req, res) => {
    console.log('POST /esp/fileUpload', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post('/esp/rename', (req, res) => {
    console.log('POST /esp/rename', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post('/esp/delete', (req, res) => {
    console.log('POST /esp/delete', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post('/esp/fwUpdate', (req, res) => {
    console.log('POST /esp/fwUpdate', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/login', (req, res) => {
    console.log('GET /esp/login', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
    //res.send("error");
});

app.get('/esp/volume', (req, res) => {
    console.log('GET /esp/volume', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/equalizer', (req, res) => {
    console.log('GET /esp/equalizer', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/mp3play', (req, res) => {
    console.log('GET /esp/mp3play', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/mp3stop', (req, res) => {
    console.log('GET /esp/mp3stop', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.get('/esp/animation', (req, res) => {
    console.log('GET /esp/animation', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.listen(80, () => {
    console.log('listening on port 80')
});

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});