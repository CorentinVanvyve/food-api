import mongoose, { ConnectOptions } from "mongoose";
import { UserAliment } from "../models/userAlimentModel";
import { User } from "../models/userModel";
import { MONGO_URL, userAlimentsData } from "../constants/foodApiConstants"
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
    await UserAliment.deleteMany({});

    const userAlimentCount = (await users).length; // Nombre d'utilisateurs à créer

    for (let i = 0; i < userAlimentCount; i++) {
			for (let n = 0; n < userAlimentsData.length; n++) {

				userAlimentsData[n].user = userIds[i];

			}
      await UserAliment.insertMany(userAlimentsData);
    }

    console.log(`${userAlimentCount * userAlimentsData.length} aliments seeded successfully.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

seedDatabase();
