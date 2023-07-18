import { User } from "../models/user.model";
import { WELCOME_MESSAGE } from "../constants/food-api.constants";
import { IUser } from "../interfaces/user.interface";

export class UserService {
    public getWelcomeMessage() {
      return WELCOME_MESSAGE;
    }

    public findAll(): Promise<IUser[]> {
      return User.find({}).exec();
    }

    public add(user: IUser): Promise<IUser> {
      const newUser = new User(user);
      return newUser.save();
    }

    public async delete(id: string) {
      const deletedUser = await User.findByIdAndDelete(id).exec();

      if (!deletedUser) {
        throw new Error(`User with id '${id}' not found`);
      }

      return deletedUser;
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