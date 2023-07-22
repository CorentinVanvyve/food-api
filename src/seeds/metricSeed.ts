import mongoose, { ConnectOptions } from "mongoose";
import { Metric } from "../models/metricModel";
import { User } from "../models/userModel";
import { MONGO_URL } from "../constants/foodApiConstants"

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
    await Metric.deleteMany({});

    const metricCount = (await users).length; // Nombre d'utilisateurs à créer

    for (let i = 0; i < metricCount; i++) {
        const birth_date = generateRandomDate();
        const height = getRandomNumber(160, 190);
        const weight = getRandomNumber(50, 90);
        const gender = getRandomGender();
        const user = userIds[i]


      const newMetric = new Metric({
        birth_date,
        height,
        weight,
        gender,
        user,
      });

      await newMetric.save();
    }

    console.log(`${metricCount} metrics seeded successfully.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomGender() {
	const genders = ['M','F','X'];

	return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomDate() {
  return new Date(
    new Date(1960, 1, 1).getTime() +
      Math.random() * (new Date().getTime() - new Date(1960, 1, 1).getTime()),
  );
}

seedDatabase();
