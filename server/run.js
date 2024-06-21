const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const data = require('./data');

app.use(bodyParser.text({ type: "*/*" }));

const corsConf = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}  
app.use(cors(corsConf));

app.get('/esp/restart', (req, res) => {
    console.log('GET /esp/restart', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
});

app.post("/esp/saveConfig", (req, res) => {
    const data = req.body.match(/{.+}/)[0];
    console.log('POST /esp/saveConfig = ', data);
    res.set('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        if(data) {
            const configFile = path.join(__dirname, '..', 'public', 'config.json');
            fs.unlinkSync(configFile);
            fs.writeFileSync(configFile, data);
            res.send("OK");
        }
        else res.send("ERROR");
    }, 2000);
});

app.post("/esp/defaultConfig", (req, res) => {
    console.log('POST /esp/defaultConfig', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    let data = req.body.replace('config:', '');
    setTimeout(() => {
        if(data == 'default') {
            const defaultConfigFile = path.join(__dirname, '..', 'public', 'defaultConfig.json');
            const configFile = path.join(__dirname, '..', 'public', 'config.json');
            fs.copyFile(defaultConfigFile, configFile, err => {
                if(err) res.send("ERROR");
                else res.send("OK");
            });
        }
        else res.send("ERROR");
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
    console.log('POST /esp/changePass', req.body);
    res.set('Access-Control-Allow-Origin', '*');
    const pass = req.body.split('&');
    const oldPass = pass[0].split('=')[1];
    const newPass = pass[1].split('=')[1];
    const userFile = path.join(__dirname, '..', 'public', 'user.us');
    const user = JSON.parse(fs.readFileSync(userFile));
    setTimeout(() => {
        if(oldPass && newPass && user.pass === oldPass) {
            const userFile = path.join(__dirname, '..', 'public', 'user.us');
            fs.unlinkSync(userFile);
            fs.writeFileSync(userFile, JSON.stringify({pass: newPass}));
            res.send("OK");
        }
        else res.send("ERROR");
    }, 2000);
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