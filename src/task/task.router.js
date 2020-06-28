const { Router } = require("express");
const taskRouter = Router();

const {
  createTask,
  updateTask,
  deleteTask,
  getTask
} = require("./task.controller");

taskRouter.get("/", getTask);
taskRouter.post("/", createTask);
taskRouter.delete('/:id', deleteTask)
taskRouter.put('/', updateTask)


module.exports = taskRouter;
