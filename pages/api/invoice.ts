import { MongoClient } from "mongodb";
import { Counter } from "../../src/types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { invoiceNumberGenerator } from "../../src/utils/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const databaseConnection: string | undefined = process.env.DB_URL;

  if (!databaseConnection) {
    throw new Error("Database connection string not found");
  }

  const client = await MongoClient.connect(databaseConnection);

  const db = client.db();
  const invoicesCollection = db.collection("invoiceItems");
  const countersCollection = db.collection<Counter>("counters");

  // Start a session for transaction
  const session = client.startSession();

  // Start a transaction
  session.startTransaction();

  if (req.method === "POST") {
    try {
      // Get the last invoice number
      const counter = await countersCollection.findOne(
        { _id: "invoiceNumber" },
        { session }
      );

      // If it doesn't exist, create it
      if (!counter) {
        await countersCollection.insertOne(
          { _id: "invoiceNumber", seq: 1 },
          { session }
        );
      } else {
        // Otherwise, increment it
        await countersCollection.updateOne(
          { _id: "invoiceNumber" },
          { $inc: { seq: 1 } },
          { session }
        );
      }

      // Get the updated counter
      const updatedCounter = await countersCollection.findOne(
        { _id: "invoiceNumber" },
        { session }
      );

      // Insert a document with the invoiceNumber as updatedCounter.seq
      const result = await invoicesCollection.insertOne(
        {
          invoiceNumber: invoiceNumberGenerator(updatedCounter!.seq),
          ...req.body,
        },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({ id: result.insertedId });
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();

      res
        .status(500)
        .json({ error: "An error occurred while creating invoice" });
    } finally {
      session.endSession();

      client.close();
    }
  } else {
    // Handle any other HTTP method
  }
}
