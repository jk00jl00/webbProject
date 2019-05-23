'use strict';

var Image = require('../models/image.js');



exports.newImage = function(req, res) {
    var new_im = new Image({data: req.body.image, class: req.body.class});

    //handles null error 
    if(!new_im.data){

            res.status(400).send({ error:true, message: 'Please provide image data' });

        }
    else{
    
        Image.create(new_im, function(err, data) {
            if (err)
            res.send(err);
            //Guess on data
            res.json(req.body.class);
        });
    }
};

exports.rndmLabel = function(req, res){
    var labels = ['dog', 'cat', 'tv', 'house', 'car', 'trashcan', 'train', 'cake', 'flashlight', 'baloon', 'person'];
    let i = Math.floor(Math.random() * Math.floor(labels.length));
    let str = labels[i];
    
    res.render('draw', { imagetag: str});    

}

exports.getGuess = function(req, res){
    Image.getRandom(res);
}

exports.postGuess = function(req, res){
    console.log(req.body);
    Image.match({guess: req.body.guess, id: req.body.id}, res);
}

exports.confirm = function(req, res){
    console.log("Guess was " + req.body.correct);
    res.json(true);
}