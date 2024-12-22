const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const data = require('./data');

const app = express();
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
    const dt = req.body.match(/"config"\r\n\r\n(.+)/);
    const data = dt ? dt[1] : null;
    console.log('POST /esp/saveConfig', data);
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

app.post("/esp/saveAlarm", (req, res) => {
    const dt = req.body.match(/"alarm"\r\n\r\n(.+)/);
    const data = dt ? dt[1] : null;
    console.log('POST /esp/saveAlarm', data);
    res.set('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        if(data) {
            const alarmFile = path.join(__dirname, '..', 'public', 'alarm.json');
            fs.unlinkSync(alarmFile);
            fs.writeFileSync(alarmFile, data);
            res.send("OK");
        }
        else res.send("ERROR");
    }, 2000);
});

app.post("/esp/defaultConfig", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const dt = req.body.match(/"config"\r\n\r\n(.+)/);
    const data = dt ? dt[1] : null;
    console.log('POST /esp/defaultConfig', data);
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

app.get('/config.json', (req, res) => {
    const configFile = path.join(__dirname, '..', 'public', 'config.json');
    const codeFile = path.join(__dirname, '..', 'public', 'code.txt');
    const codeUser = req.query.code;
    const code = String(JSON.parse(fs.readFileSync(codeFile)));
    const config = JSON.parse(fs.readFileSync(configFile));

    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
        if(config.account.required > 0) {
            if(codeUser === code) res.send(JSON.stringify(config));
            else res.send(`{"lang":"${config.lang}", "state":"LOGIN"}`);
        }
        else res.send(JSON.stringify(config));
    }, 2000);
});

app.get('/alarm.json', (req, res) => {
    const alarmFile = path.join(__dirname, '..', 'public', 'alarm.json');
    const alarm = JSON.parse(fs.readFileSync(alarmFile));

    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(alarm));
    }, 2500);
});

app.get('/defaultConfig.json', (req, res) => {
    const configFile = path.join(__dirname, '..', 'public', 'defaultConfig.json');
    const config = JSON.parse(fs.readFileSync(configFile));

    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(config));
    }, 2000);
});

app.get('/data.json', (req, res) => {
    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(data(req.query.code)));
    }, 500);
});

app.get('/esp/changelang', (req, res) => {
    console.log('GET /esp/changelang', req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.send("OK");
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
    console.log('POST /esp/changePass');
    res.set('Access-Control-Allow-Origin', '*');
    const op = req.body.match(/"oldPass"\r\n\r\n(.+)/);
    const np = req.body.match(/"newPass"\r\n\r\n(.+)/);
    const cd = req.body.match(/"code"\r\n\r\n(.+)/);
    const oldPass = op ? op[1] : null;
    const newPass = np ? np[1] : null;
    const code = cd ? cd[1] : null;
    console.log('old pass:', oldPass);
    console.log('new pass:', newPass);
    console.log('code:', code);
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

app.post('/esp/login', (req, res) => {
    const nm = req.body.match(/"name"\r\n\r\n(.+)/);
    const name = nm ? nm[1] : null;
    const ps = req.body.match(/"pass"\r\n\r\n(.+)/);
    const pass = ps ? ps[1] : null;
    console.log('POST /esp/login:', 'username =', name, '| password =', pass);
    setTimeout(() => {
        const userFile = path.join(__dirname, '..', 'public', 'user.us');
        const configFile = path.join(__dirname, '..', 'public', 'config.json');
        const codeFile = path.join(__dirname, '..', 'public', 'code.txt');
        const user = JSON.parse(fs.readFileSync(userFile));
        const config = JSON.parse(fs.readFileSync(configFile));
        res.set('Access-Control-Allow-Origin', '*');
        if(config.account.name === name && user.pass === pass) {
            const code = Math.round(Math.random() * 10000000000);
            fs.unlinkSync(codeFile);
            fs.writeFileSync(codeFile, String(code));
            res.send(`OK:${code}`);
        }
        else res.send("error:1");
    }, 1000);
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

app.get('/netlist', (req, res) => {
    setTimeout(() => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send("OK");
    }, 8000);
});

app.listen(80, () => {
    console.log('listening on port 80')
});

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});