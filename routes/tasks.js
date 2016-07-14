const tasks = require('express').Router();

const taskData = []
// const sendJSONresp = (req.res)=>res.json(res.rows);


tasks.route('/:id')
  .get((req,res)=>res.send(`show task ${req.params.id}`))
  .put((req,res)=>res.send(`edit task ${req.params.id}`))
  .delete((req,res)=>res.send(`delete task ${req.params.id}`))

tasks.route('/')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('add a new task'));


module.exports = tasks;
