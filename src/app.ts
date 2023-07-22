import { MONGO_URL } from "./constants/food-api.constants";
import { Application } from "express";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { MetricController } from "./controllers/metric.controller";
import { MetricService } from "./services/metric.service";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }));
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    // Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    } as ConnectOptions);

    // Renaming _id to id
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });
  }


  private setControllers() {
    // Creating a new instance of our User Controller
    const userController = new UserController(new UserService());
    const metricController = new MetricController(new MetricService());

    // Telling express to use our Controller's routes
    this.app.use("/user", userController.router);
    this.app.use("/metric", metricController.router);
  }
}

export default new App().app;