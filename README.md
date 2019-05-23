# Webb project repo

## Create a db.js file with the folowing look

```javascript
'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'database'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
```



## Weekly plans

### V.18
    Get the client side of the drawing page done. Yes
    This includes the drawing to the canvas and the requests to a server. Yes
    The drawing will not include more colours in order to save time as for now. Yes


### V.19
    Set up the backend for the drawing side with a dummy answer instead of the computors guess.