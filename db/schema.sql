DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
  task_id SERIAL PRIMARY KEY NOT NULL,
  task_name VARCHAR(64) NOT NULL,
  task_desc TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  task_time_start TIMESTAMP,
  task_time_end TIMESTAMP,
  task_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX on tasks (completed);
CREATE INDEX on tasks (task_time_start);
CREATE INDEX on tasks (task_created);
