'use strict'
const pg = require('pg-promise')({
// Initialization Options
});
const config = {
host:       process.env.DB_HOST,
port:       process.env.DB_PORT,
database:   process.env.DB_NAME,
user:       process.env.DB_USER,
password:   process.env.DB_PASS,
};

const _db = pg(config);


module.exports = {
  getTasks(req,res,next){
    _db.any("SELECT * from tasks;")
    .then( tasks=>{
      res.rows = tasks;
      next();
    })
    .catch(error=>{
      console.log('ERROR in GETTING TASK', error);
    })
  },

  addTask(req,res,next){
    console.log('======', req.body)
    _db.any(
      `INSERT INTO
      tasks (task_name, task_desc)
      VALUES ($1, $2)
      returning *;` , [req.body.name, req.body.desc]
    )
    .then(task=>{
      console.log("Added task successfully");
      res.rows = task;
      next();
    })
    .catch(error=>{
      console.log('ERROR in ADDING TASK', error);
    })
  },

    /* PUT /tasks/:ID */
  updateTask(req, res, next) {
    req.body.tID = Number.parseInt(req.params.taskID);
    req.body.completed = !!req.body.completed;
    _db.any(
      `UPDATE tasks SET
      task_name = $/task_name/,
      task_desc = $/task_desc/,
      completed = $/completed/
      WHERE task_id = $/tID/
      `, req.body)
    .then(task=>{
      console.log("Updated task successfully");
      res.rows = task;
      next();
    })
    .catch(error=>{
      console.log("ERROR in UPDATING TASK", error);
    })
  },

  /* DELETE /tasks/:ID */
  deleteTask(req, res, next) {
    req.body.tID = Number.parseInt(req.params.taskID);
    _db.none(`
      DELETE FROM tasks
      WHERE task_id = ($1)
    `, [req.body.tID])
    .then(task=>{
      console.log("deleted task successfully");
      next();
    })
    .catch(error=>{
      console.error('ERROR in DELETING TASK', error);
    })
  }

}
