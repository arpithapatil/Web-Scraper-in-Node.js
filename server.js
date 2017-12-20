var express = require('express');
var fs      = require('fs');
var axios = require('axios');
var readline = require('readline');
var cheerio = require('cheerio');
var app     = express();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input an emailadress? ', (answer) => {
 var array = answer.split('@');
 var web = array[1];
 var input = 'www.'+ web;
 base_url = `https://${input}/contact`
 axios.get(base_url).then( (response) => {
    //  console.log(response);
    let $ = cheerio.load(response.data);
    console.log(response.data);
    let info  = [];  
    

 rl.close();
 });
});
  


app.listen('8081')
exports = module.exports = app;
