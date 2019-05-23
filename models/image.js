'use strict';

var sql = require('./db.js');


var Image = function(im) {
    this.data = im.data;
    this.class = im.class;
    this.timestamp = new Date();
    this.name = im.class + "_" + new Date().getSeconds() + "_" + new Date().getMinutes() + "_" +
        new Date().getHours() + "_" + new Date().getDay() + "_" + new Date().getMonth() + "_" + new Date().getFullYear();
}

Image.create = function(newIm, result){
    sql.query("INSERT INTO images set ?", newIm, function(err, res){

        if(err) {
            console.log("Error:", err);
            result(err, null);
        } else{
            console.log(res.insertId);
            result(null,  newIm.data);
        }
    });

}

Image.getRandom = function(response){
    sql.query("SELECT data, id FROM images ORDER BY RAND() LIMIT 1", function(err, res){

        if(err) {
            console.log("Error:", err);
        } else{
            console.log(res[0].class);
            let im = {data: res[0].data, id: res[0].id};
            response.render('guess', { imagetag: im.id, data: im.data}); 
        }
    });
}

Image.match = function(guess, response){
    console.log(guess);
    sql.query("SELECT class FROM images where id="+guess.id, function(err, res){

        if(err) {
            console.log("Error:", err);
        } else{
            console.log(res[0]);
            response.json((res[0].class == guess.guess)); 
        }
    });
}



module.exports = Image;