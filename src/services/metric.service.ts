import { Metric } from "../models/metric.model";
import { IMetric } from "../interfaces/metric.interface";

export class MetricService {

    public findAll(): Promise<IMetric[]> {
      return Metric.find({}).exec();
    }

    public async findOne(id: string): Promise<IMetric> {
      const metricFound = await Metric.findById(id).exec();

      if (!metricFound) {
        throw new Error(`Metric with id '${id}' not found`);
      }

      return metricFound;
    }

    public add(metric: IMetric): Promise<IMetric> {
      const newMetric = new Metric(metric);
      return newMetric.save();
    }

    public async update(id: string, metric: IMetric) {

      const { gender, weight, height, birth_date } = metric;

      // Find the existing Metric object by its ID
      const updatedMetric = await Metric.findById(id);

      if (!updatedMetric) {
        throw new Error(`Metric with id '${id}' not found`);
      }

      // Update the user-provided attributes if they are provided in the request
      if (gender) updatedMetric.gender = gender;
      if (weight) updatedMetric.weight = weight;
      if (height) updatedMetric.height = height;
      if (birth_date) updatedMetric.birth_date = birth_date;

      // Save the updated Metric object (the pre-update middleware will calculate maintenance if needed)
      await updatedMetric.save();

      return updatedMetric;
    }
  }
