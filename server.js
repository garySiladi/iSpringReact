"use strict";

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const XMLMapping = require('xml-mapping');
const morgan = require('morgan');
const results = require('./api/results.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
const port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening at: ' + port);

// app.listen();

app.post('/', function(req, res){
    console.log('---QUIZ POST---');
    const quiz = createData(req.body);
    const resPath = path.join(__dirname, 'results', `${quiz.id}.json`);
    jsonfile.writeFile(resPath, quiz, function (err) {
      if (err) console.error(err);
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('OK');
});

app.use(express.static(__dirname + '/build'));

app.get('/results', function(req, res){
  let quizes = [];
  const items = fs.readdirSync('./results');
  for (var i=0; i<items.length; i++) {
    let file = fs.readFileSync(path.join('./results', items[i]));
    quizes.push(JSON.parse(file));
  }
  res.send(quizes);
});

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

function createData(data) {
  const dP = new Date();
  let quiz = {};
  quiz.id = generateID();
  quiz.name = data.USER_NAME;
  quiz.email = data.USER_EMAIL;
  quiz.time = toHHMMSS(data.ut);
  quiz.class = data.Class;
  quiz.maxscore = data.tp;
  quiz.passingscore = data.ps;
  quiz.title = data.qt;
  quiz.score = data.sp;
  quiz.percentage = data.sp/(data.tp/100);
  quiz.datemilli = dP.getTime();
  quiz.grade = checkGrade(quiz.percentage);
  quiz.date = dP.getDate() + '/' + dP.getMonth() + '/' + dP.getFullYear();
  quiz.desc = XMLMapping.load(data.dr);
  return quiz;
}

function toHHMMSS(string) {
    var sec_num = parseInt(string, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function checkGrade(percentage) {
  if (percentage >= 90) return 1;
  else if (percentage >= 75) return 2;
  else if (percentage >= 50) return 3;
  else if (percentage >= 25) return 4;
  else return 5;
}

function generateID() {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ID_LENGTH = 8;
  let rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

// console.log(JSON.parse(fs.readFileSync('./quizdata.json')));
