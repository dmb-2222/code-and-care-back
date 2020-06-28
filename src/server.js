const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { port } = require("../config");
const taskRouter = require("./task/task.router");

require("dotenv").config();

module.exports = class Server {
  constructor() {
    this.server = null;
  }
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server
      // .use(express.json())
      // this.server.use(express.urlencoded());
      .use(bodyParser.urlencoded({ extended: false }))
      .use(bodyParser.json())
      .use(morgan("dev"))
      .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
      })
    .use((err, req, res, next) => {
      console.log(req.body);
      delete err.stack;
      next(err);
    })
    .options("*", (req, res) => {
      // allowed XHR methods
      res.header(
        "Access-Control-Allow-Methods",
        "GET, PATCH, PUT, POST, DELETE, OPTIONS"
      );
      res.send();
    });
  }

  initRoutes() {
    this.server.use("/task", taskRouter);
  }
  async initDatabase() {
    await mongoose.connect(process.env.MONGODB_URL, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // const db = calendarTask.db(process.env.DB_NAME);
    // const task = db.collection("task");
  }
  startListening() {
    this.server.listen(port, () => {
      console.log("Start server port", port);
    });
  }
};
