import { Profile } from "../models/profileModel";
import { IProfile } from "../interfaces/profileInterface";

export class ProfileService {

    public findAll(): Promise<IProfile[]> {
      return Profile.find({}).exec();
    }

    public async findOne(id: string): Promise<IProfile> {
      const profileFound = await Profile.findById(id).exec();

      if (!profileFound) {
        throw new Error(`Profile with id '${id}' not found`);
      }

      return profileFound;
    }

    public add(profile: IProfile): Promise<IProfile> {
      const newProfile = new Profile(profile);
      return newProfile.save();
    }

    public async update(id: string, profile: IProfile) {
      const updatedProfile = await Profile.findByIdAndUpdate(
        id,
        profile
      ).exec();

      if (!updatedProfile) {
        throw new Error(`Profile with id '${id}' not found`);
      }

      return updatedProfile;
    }
  }