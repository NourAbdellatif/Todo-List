const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var urlencoded=bodyParser.urlencoded({extended: false});
//var data=[{item: 'get milk'},{item: 'workout'},{item: 'feed cat'}];
//Connect to database

mongoose.connect('mongodb+srv://test:test@cluster0-iaxrg.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});
//Create a schema--blueprint
var todoSchema=new mongoose.Schema({
  item: String
});

var Todo= mongoose.model('Todo',todoSchema);
module.exports =function(app){
  app.get('/todo',function(req,res){
    //get data from mongodb and pass it to view
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos: data});
    });
  });

  app.post('/todo',urlencoded,function(req,res){
    //get data from view to add it to mongodb
    var newTodo= Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item',function(req,res){
    //delete requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });
};
