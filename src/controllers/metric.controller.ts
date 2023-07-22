import { Request, Response, Router } from "express";
import { MetricService } from "../services/metric.service";

export class MetricController {
  public router = Router();

  constructor(private metricService: MetricService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll).post(this.add);
    this.router.route("/:id").put(this.update).get(this.findOne);
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const metrics = await this.metricService.findAll();
      res.send({metrics});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private findOne = async (req: Request, res: Response) => {
    try {
      const metric = await this.metricService.findOne(req.params.id);
      res.send({metric});
    } catch (e: any)  {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addMetricResult = await this.metricService.add(req.body);
      res.send(addMetricResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updateMetricResult = await this.metricService.update(
        req.params.id,
        req.body
      );
      res.send(updateMetricResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };
}