import mongoose, { ConnectOptions } from "mongoose";
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

    // Supprimer tous les utilisateurs existants avant de seeder de nouvelles données (optionnel)
    await User.deleteMany({});

    const userCount = 10; // Nombre d'utilisateurs à créer

    for (let i = 0; i < userCount; i++) {
      const phone = faker.phone.phoneNumberFormat();

      const newUser = new User({
        phone,
      });

      await newUser.save();
    }

    console.log(`${userCount} users seeded successfully.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

seedDatabase();
