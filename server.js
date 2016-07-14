'use strict'
const env           = process.env.NODE_ENV || 'development';
const DEV           = env==='development';
const dotenv        = (DEV) ? require('dotenv').config() : undefined;
const express       = require('express')
const bodyParser    = require('body-parser');
const logger        = require('morgan')
const path          = require('path')
const tasksRoutes   = require('./routes/tasks')
const PORT          = process.env.port || process.argv[2] || 3009

const app           = express()

app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));
app.use( bodyParser.json());

app.listen(PORT, ()=>
  console.log('All systems go! Port:', PORT)
)

//ROUTES

app.use('/tasks', tasksRoutes);


app.get('/' , (req,res)=>
  res.send('show the homepage')
);
