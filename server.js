'use strict'

const express    = require('express')
const logger     = require('morgan')
const path       = require('path')
const PORT       = process.env.port || process.argv[2] || 3009

const app         = express()

app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));


app.listen(PORT, ()=>
  console.log('All systems go! Port:', PORT)
)

//ROUTES

app.route('/tasks/:id')
  .get((req,res)=>res.send(`show task ${req.params.id}`))
  .put((req,res)=>res.send(`edit task ${req.params.id}`))
  .delete((req,res)=>res.send(`delete task ${req.params.id}`));

app.route('/tasks')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('add a new task'));

app.get('/' , (req,res)=>
  res.send('show the homepage')
);
