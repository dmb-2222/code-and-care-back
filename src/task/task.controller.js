const taskModel = require("./task.model");

const createTask = async (req, res, next) => {
  console.log(req.body);
  try {
    const { start, duration, title } = req.body;
    const task = await taskModel.create({
      start,
      duration,
      title,
    });
    console.log(task);
    return res.status(201).json({
      start: task.start,
      duration: task.duration,
      title: task.title,
      _id: task._id,
    });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const data = await taskModel.find().sort({ start: 1 });
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  console.log(req.body);
  //   const id = req.params.id;
  const id = "5ef4b5e69cafbb0ff8428361";
  try {
    const data = req.body;
    console.log(data);
    taskModel.findByIdAndUpdate(id, data, function (err, task) {
      if (err) res.status(400).json({ status: "no-success", err: err });
      res.status(200).json({ status: "success" });
      console.log("Обновленный объект", task);
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    await taskModel.findByIdAndRemove(id);
    // const data = await taskModel.find();
    res.status(204).json({ success: "succces" });
    // console.log(data)
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTask, updateTask, deleteTask };
