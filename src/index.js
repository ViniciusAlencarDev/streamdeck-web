"use strict;"

var exec = require('child_process').exec;

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const ejs = require('ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cors())

const configServer = require('./config/configServer.json');
const protocol = process.env.PROTOCOL || configServer.protocol;
const ip = require('ip').address();
const port = process.env.PORT || configServer.port;

const iconePadrao = "https://cdn.pixabay.com/photo/2017/06/20/14/55/icon-2423349_960_720.png";

let listaAtalhos = [
    {
        title: "CMD",
        icone: "https://cdn.pixabay.com/photo/2016/06/15/14/54/download-1459071_960_720.png",
        command: "start cmd.exe"
    },
    {
        title: "Twitch",
        icone: "https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_960_720.png",
        command: "start https://twitch.tv"
    },
    {
        title: "Outro",
        icone: iconePadrao,
        command: "msg * funcionando"
    }
]
let atalhos = []
let atalhosComandos = {}

listaAtalhos.map(value => {
    atalhosComandos[value.title] = value.command;
    delete(value.command)
    atalhos.push(value);
})

// console.log(atalhos)
// console.log(atalhosComandos)

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/list', (req, res) => {
    res.json(atalhos);
});

app.get('/:atalho', (req, res) => {
    if(atalhosComandos[req.params.atalho] !== undefined) {
        exec(atalhosComandos[req.params.atalho])
        res.send('executado');
    } else
        res.send('comando nao localizado')
});

app.listen(port, () => {
    console.log(`Server started in ${protocol}://${ip}:${port}`)
})
