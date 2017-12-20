var axios = require('axios');
var readline = require('readline');
var cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input an emailadress? ', (answer) => {
    var array = answer.split('@');
    var web = array[1];
    var input = 'www.' + web;
    url = `https://${input}/contact`;
    app.get('/scrape', function (req, res) {
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var telephone, email, streetAddress, addressLocality, postalCode;
                var json = { telephone: "", email: "", streetAddress: "", addressLocality: "", postalCode: "" };
                var children = $('.col-md-6');
                var num = children.find('span[itemprop="telephone"]').html();
                json.telephone = num;
                var email = children.find('span[itemprop="email"]').html();
                json.email = email;
                var street = children.find('span[itemprop="streetAddress"]').html();
                json.streetAddress = street;
                var locality = children.find('span[itemprop="addressLocality"]').html();
                json.addressLocality = locality;
                var post = children.find('span[itemprop="postalCode"]').html();
                json.postalCode = post;

                fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
                    console.log('File successfully written! - Check your project directory for the output.json file');
                })

                res.send('Check your console!');

                rl.close();

            };
        });
    });
});

app.listen('8081');
exports = module.exports = app;





