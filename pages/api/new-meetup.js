import { ConnectionClosedEvent, MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    // store in database.

    const client = await MongoClient.connect(
      "mongodb+srv://admin:x5aZPk5WPjDaJxCH@cluster0.yy3n2.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);

    console.log(result);

    await client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler;
