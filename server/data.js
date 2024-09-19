const fs = require('fs');
const path = require('path');

const random = (min, max) => { 
    max *= 1000000;
    min *= 1000000;
    return Math.floor(Math.random() * (max - min + 1) + min) / 1000000;
}

const getFiles = (dir, files_) => {
	files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for(let i in files) {
        let name = dir + '/' + files[i];
        if(fs.statSync(name).isDirectory()) getFiles(name, files_);
        else {
            if(files[i] !== 'user.us' && files[i] !== 'data.json')
                files_.push({name: name.split('public')[1], size: fs.statSync(name).size});
        }
    }
    return files_;
};

const filelist = () => {
    const files = getFiles(path.join(__dirname, '../public'));
    let list = '';
    files.map(file => {
        list += file.name + ':' + file.size + ','
    });
    return list;
}

const mainIcons = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const data = (cookieCode) => {
    const dt = new Date();
    const date = Math.floor(dt / 1000) - dt.getTimezoneOffset() * 60;
    const codeFile = path.join(__dirname, '..', 'public', 'code.txt');
    const code = fs.readFileSync(codeFile, 'utf8');

    obj = {
        state: cookieCode === code ? "OK" : "LOGIN",
        fw: "v300.4",
        esp32: {
            temp: random(50, 60)
        },
        runtime: Math.round(random(3, 3000)),
        time: date,
        network: {
            ssid: "budulai",
            ch: 14,
            sig: Math.round(random(-70, -50)),
            mac: "DE:AD:BE:EF:FE:ED",
            ip: "192.168.192.168",
            mask: "255.255.255.255",
            gw: "192.168.0.1",
            dns1: "7.7.7.7",
            dns2: "9.9.9.9"
        },

        ssids: [
            ["SosediSnizu", Math.round(random(40, 50))],
            ["virus.trojan", Math.round(random(60, 70))],
            ["Vodafno-777", Math.round(random(40, 50))],
            ["veryLongWirelessNetworkNameHere", Math.round(random(15, 25))],
            ["Tp-Link_6732", Math.round(random(85, 95))],
            ["Vodafone-987", Math.round(random(20, 30))],
            ["Megafon5", Math.round(random(60, 70))],
            ["Emgafno6", Math.round(random(80, 90))],
            ["My-WiFi", Math.round(random(90, 100))],
            ["Hotel za uglom", Math.round(random(50, 60))]
        ],
        
        bme680: {
            temp: random(20, 25), // obviously correct values
            hum: random(50, 55),
            pres: random(900, 950),
            iaq: random(0, 210),
            iaqAccr: Math.round(random(0, 3))
        },
        bme280: {
            temp: random(450, 500), // obviously incorrect values
            hum: random(900, 1000),
            pres: random(8000, 8500)
        },
        bmp180: {
            temp: random(300, 400), // obviously incorrect values
            pres: random(8000, 9000)
        },
        sht21: {
            temp: random(-200, -100), // obviously incorrect values
            hum: random(100, 200)
        },
        dht22: {
            temp: random(20, 25), // obviously correct values
            hum: random(40, 50)
        },
        ds18b20: {
            temp: random(150, 200) // obviously incorrect values
        },
        max44009: {
            light: random(800, 1200) // obviously correct values
        },
        bh1750: {
            light: random(-120, -150) // obviously incorrect values
        },
        analog: {
            volt: random(1, 2)
        },
        wsensor: {
            time: [
                Math.floor(date - random(300, 360)), // 5 - 6 minutes ago
                Math.floor(date - 1000000) // 12 days ago
            ],
            temp: {
                data: [ 
                    [random(-10, -50), random(10, 5)],
                    [random(14, 18), random(700, 750)],
                    [random(40, 45), random(400, 500)],
                    [random(-14, -11), random(-800, -500)],
                    [random(30, 40), random(900, 1000)]
                ],
                name: [
                    ["BME280", "SHT21"],
                    ["DS18B20", "DS18B20"],
                    ["DS18B20", "DS18B20"],
                    ["DS18B20", "DS18B20"],
                    ["DS18B20", "DS18B20"]
                ]
            },
            hum: {
                data: [random(90, 100), random(50, 60)],
                name: ["BME280", "SHT21"]
            },
            pres: {
                data: [random(800, 1000), random(800, 1000)],
                name: ["BME280", "BMP180"]
            },
            light: {
                data: [random(1, 20), random(12000, 12500)],
                name: ["MAX44009", "BH1750"]
            },
            co2: {
                data: [random(400, 450), random(450, 470)],
                name: ["Senseair S8", "Senseair S8"]
            },
            voltage: {
                data: [random(216, 223), random(2220, 2320)],
                name: ["PZEM-004t", "PZEM-004t"]
            },
            current: {
                data: [random(0, 10) / 10, random(1110, 11110) / 10],
                name: ["PZEM-004t", "PZEM-004t"]
            },
            power: {
                data: [random(50, 60), random(-1200, -1300)],
                name: ["PZEM-004t", "PZEM-004t"]
            },
            energy: {
                data: [random(400, 500), random(-100, -150)],
                name: ["PZEM-004t", "PZEM-004t"]
            },
            freq: {
                data: [random(45, 55), random(450, 550)],
                name: ["PZEM-004t", "PZEM-004t"]
            },
            bat: [random(700, 850), random(750, 800)]
        },
        weather: {
            icon: mainIcons[Math.round(random(0, 9))],
            isDay: Math.round(random(0, 1)),
            temp: random(-30, 30),
            hum: random(90, 100),
            pres: random(800, 850),
            wind: {
                speed: random(1, 7),
                dir: random(0, 360)
            },
            descript: "Regen rain дождь deszcz дощ",
            time: Math.floor(date - random(600, 660)), // 10 - 11 minutes ago
            daily: {
                tMax: [random(-25, 25), random(-25, 25), random(-25, 25), random(-25, 25)],
                tMin: [random(-25, 25), random(-25, 25), random(-25, 25), random(-25, 25)],
                wind: [random(0, 15), random(0, 15), random(0, 15), random(0, 15)],
                icon: [mainIcons[Math.round(random(0, 9))], mainIcons[Math.round(random(0, 9))], mainIcons[Math.round(random(0, 9))], mainIcons[Math.round(random(0, 9))]],
            }
        },
        thing: {
            time: Math.floor(date - random(600, 660)), // 10 - 11 minutes ago
            data: [random(-5, -4), random(56, 59), random(768, 777), Math.round(random(2, 4)), -40400.0, random(99, 102), random(1359, 1362), random(-12, -10)]
        },
        fs: { 
            total: 2056988,
            free: 563727,
            list: filelist()
        }
    }

    return obj;
}

module.exports = data;