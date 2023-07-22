import { Request, Response, Router } from "express";
import { UserService } from "../services/userService";

export class UserController {
  public router= Router();

  constructor(private userService: UserService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll).post(this.add);
    this.router.route("/:id").put(this.update).get(this.findOne);
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.send({users});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private findOne = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.send({user});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addUserResult = await this.userService.add(req.body);
      res.send(addUserResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };



  private update = async (req: Request, res: Response) => {
    try {
      const updateUserResult = await this.userService.update(
        req.params.id,
        req.body
      );
      res.send(updateUserResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };
}