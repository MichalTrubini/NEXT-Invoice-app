import { MongoClient } from "mongodb";

export default async function connectToDatabase() {

  const databaseConnection:string | undefined = process.env.DB_URL
  if (!databaseConnection) {
    throw new Error("Database connection string not found");
  }
  const clientPromise = await MongoClient.connect(databaseConnection);

  return clientPromise;
}
