const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var urlencoded=bodyParser.urlencoded({extended: false});
var data=[{item: 'get milk'},{item: 'workout'},{item: 'feed cat'}];


module.exports =function(app){
  app.get('/todo',function(req,res){
    res.render('todo',{todos:data});
  });

  app.post('/todo',urlencoded,function(req,res){
    data.push(req.body);
    res.json(data);
    });
  app.delete('/todo/:item',function(req,res){
    data=data.filter(function(todo){
      return todo.item.replace(/ /g,'-') !== req.params.item;
    });
      res.json(data);
    });
  }
