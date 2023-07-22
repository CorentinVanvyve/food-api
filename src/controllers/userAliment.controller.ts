import { Request, Response, Router } from "express";
import { UserAlimentService } from "../services/userAlimentService";

export class UserAlimentController {
  public router= Router();

  constructor(private userAlimentService: UserAlimentService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll).post(this.add);
    this.router.route("/:id").put(this.update).get(this.findOne);
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const userAliments = await this.userAlimentService.findAll();
      res.send({userAliments});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private findOne = async (req: Request, res: Response) => {
    try {
      const userAliment = await this.userAlimentService.findOne(req.params.id);
      res.send({userAliment});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addUserAlimentResult = await this.userAlimentService.add(req.body);
      res.send(addUserAlimentResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };



  private update = async (req: Request, res: Response) => {
    try {
      const updateUserAlimentResult = await this.userAlimentService.update(
        req.params.id,
        req.body
      );
      res.send(updateUserAlimentResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };
}