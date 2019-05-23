'use strict';

var sql = require('./db.js');


var NewImage = function(im) {
    this.data = im.data;
    this.strikes = 0;
    this.corrects = 0;
    this.class = im.class;
    this.timestamp = new Date();
    this.name = im.class + "_" + new Date().getSeconds() + "_" + new Date().getMinutes() + "_" +
        new Date().getHours() + "_" + new Date().getDay() + "_" + new Date().getMonth() + "_" + new Date().getFullYear();
}

NewImage.create = function(newIm, result){
    sql.query("INSERT INTO images set ?", newIm, function(err, res){

        if(err) {
            console.log("Error:", err);
            result(err, null);
        } else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })

}

NewImage.remove = function(id, result){
    sql.query("DELETE FROM new_images WHERE id = ?", id, function(err, res){

        if(err) {
            console.log("Error:", err);
            result(err, null);
        } else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })

}

NewImage.edit = function(corrects, strikes, result){
    corrects = corrects ? corrects : 0;
    strikes = strikes ? strikes : 0;

    sql.query("DELETE FROM new_images WHERE id = ?", id, function(err, res){

        if(err) {
            console.log("Error:", err);
            result(err, null);
        } else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })

}

module.exports = Image;