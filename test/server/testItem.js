/**
 * Spacely Text & Binary Goods Inc.
 *
 * User: lcollins
 * Date: 10/27/13
 * Time: 5:36 PM
 *
 */
var request = require('supertest');
//    , express = require('express');

var app = require("../../app.js");

app.get('/user', function(req, res){
    res.send(201, { name: 'tobi' });
});

request(app)
    .get('/items')
    .expect('Content-Type', /json/)
    //.expect('Content-Length', '20')
    .expect(201)
    .end(function(err, res){
        console.dir(["Error",err, "/items: ", res.body]);
        if (err) throw err;
        console.dir(["/items: End:", res]);
        process.exit();
    });
