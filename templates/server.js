const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const request = require('request');

const config = require('./src/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.listen();
server.on('listening', () => {
    console.log(`${server.address().port} in ${app.get('env')} mode.`);

    const registerToMotherlord = () => {
        const uri = `${config.swarm.motherlord}/register/service/#NAME#/${server.address().port}`;

        const options = {
            method: 'PUT',body: {
                linked: ['#NAME#']
            },
            json: true,
            uri: uri
        };
        console.log(`attempt to register to motherlord : ${uri}`);
        request(options, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to motherlord");
            }
        });

    };
    registerToMotherlord();
    setInterval(registerToMotherlord, 10*1000);
});

app.post('/service', (req, res, next) => {
    // Add here what you intend to do when the bot request this micro service
    // for example greeting, answer question, ...
});



