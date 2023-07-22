import { MONGO_URL } from "./constants/foodApiConstants";
import { Application } from "express";
import { UserController } from "./controllers/userController";
import { UserService } from "./services/userService";
import { MetricController } from "./controllers/metricController";
import { MetricService } from "./services/metricService";
import { ProfileController } from "./controllers/profileController";
import { ProfileService } from "./services/profileService";
import { UserAlimentController } from "./controllers/userAliment.controller";
import { UserAlimentService } from "./services/userAlimentService";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";

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
    // Creating a new instance of our Controllers
    const userController = new UserController(new UserService());
    const metricController = new MetricController(new MetricService());
    const profileController = new ProfileController(new ProfileService());
    const userAlimentController = new UserAlimentController(new UserAlimentService());

    // Telling express to use our Controller's routes
    this.app.use("/user", userController.router);
    this.app.use("/metric", metricController.router);
    this.app.use("/profile", profileController.router);
    this.app.use("/useraliment", userAlimentController.router);
  }
}

export default new App().app;