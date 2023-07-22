import mongoose, { ConnectOptions } from "mongoose";
import { Profile } from "../models/profileModel";
import { User } from "../models/userModel";
import { MONGO_URL } from "../constants/foodApiConstants"
const faker = require('faker');

async function seedDatabase() {
  try {

    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
    } as ConnectOptions);

    console.log("Connected to the database");

    const users = User.find({}).exec();

	const userIds = (await users).map((user) => user.id);

    // Supprimer tous les utilisateurs existants avant de seeder de nouvelles données (optionnel)
    await Profile.deleteMany({});

    const profileCount = (await users).length; // Nombre d'utilisateurs à créer

    for (let i = 0; i < profileCount; i++) {
      const first_name = faker.name.firstName();
      const last_name = faker.name.lastName();

      const user = userIds[i]


      const newProfile = new Profile({
        first_name,
        last_name,
        user,
      });

      await newProfile.save();
    }

    console.log(`${profileCount} profiles seeded successfully.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

seedDatabase();
