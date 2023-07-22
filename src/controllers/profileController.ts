import { Request, Response, Router } from "express";
import { ProfileService } from "../services/profileService";

export class ProfileController {
  public router= Router();

  constructor(private profileService: ProfileService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll).post(this.add);
    this.router.route("/:id").put(this.update).get(this.findOne);
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const profiles = await this.profileService.findAll();
      res.send({profiles});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private findOne = async (req: Request, res: Response) => {
    try {
      const profile = await this.profileService.findOne(req.params.id);
      res.send({profile});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addProfileResult = await this.profileService.add(req.body);
      res.send(addProfileResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };



  private update = async (req: Request, res: Response) => {
    try {
      const updateProfileResult = await this.profileService.update(
        req.params.id,
        req.body
      );
      res.send(updateProfileResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };
}