import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    console.log("Request method:", req.method);
    console.log("Request body:", req.body);
    await client.connect();
    const db = client.db("hr");
    const employees = db.collection("employees");

    switch (req.method) {
      case "GET":
        const allEmployees = await employees.find({}).toArray();
        res.status(200).json(allEmployees);
        break;
      case "POST":
        const newEmployee = req.body;
        const result = await employees.insertOne(newEmployee);
        res.status(201).json(result);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed!`);
    }
  } catch (e) {
    console.error("Detailed Error:", e);
    res.status(500).json({
      error: e.message,
      stack: e.stack,
    });
  }
}
