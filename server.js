/**
 * Created by yangyang on 3/2/16.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));
app.listen(3000);