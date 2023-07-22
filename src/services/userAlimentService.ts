import { UserAliment } from "../models/userAlimentModel";
import { IUserAliment } from "../interfaces/userAlimentInterface";

export class UserAlimentService {

    public findAll(): Promise<IUserAliment[]> {
      return UserAliment.find({}).exec();
    }

    public async findOne(id: string): Promise<IUserAliment> {
      const userAlimentFound = await UserAliment.findById(id).exec();

      if (!userAlimentFound) {
        throw new Error(`UserAliment with id '${id}' not found`);
      }

      return userAlimentFound;
    }

    public add(userAliment: IUserAliment): Promise<IUserAliment> {
      const newUserAliment = new UserAliment(userAliment);
      return newUserAliment.save();
    }

    public async update(id: string, userAliment: IUserAliment) {
      const updatedUserAliment = await UserAliment.findByIdAndUpdate(
        id,
        userAliment
      ).exec();

      if (!updatedUserAliment) {
        throw new Error(`UserAliment with id '${id}' not found`);
      }

      return updatedUserAliment;
    }
  }