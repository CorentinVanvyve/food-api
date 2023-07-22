import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export class UserService {

    public findAll(): Promise<IUser[]> {
      return User.find({}).exec();
    }

    public async findOne(id: string): Promise<IUser> {
      const userFound = await User.findById(id).exec();

      if (!userFound) {
        throw new Error(`User with id '${id}' not found`);
      }

      return userFound;
    }

    public add(user: IUser): Promise<IUser> {
      const newUser = new User(user);
      return newUser.save();
    }

    public async update(id: string, user: IUser) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        user
      ).exec();

      if (!updatedUser) {
        throw new Error(`User with id '${id}' not found`);
      }

      return updatedUser;
    }
  }