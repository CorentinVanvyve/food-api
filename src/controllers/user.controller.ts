import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  public router= Router();

  constructor(private userService: UserService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.sayHello).post(this.add);
    this.router.route("/all").get(this.findAll);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.userService.getWelcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.send({users});
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

  private delete = async (req: Request, res: Response) => {
    try {
      const deleteUserResult = await this.userService.delete(
        req.params.id
      );
      res.send(deleteUserResult);
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