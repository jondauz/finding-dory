var express = require('express');

var path = require('path');

app = express();
app.use(express.static(path.join(__dirname, 'www')));

var port = process.env.PORT || 5000;

app.listen(port);

console.log('server started '+port);