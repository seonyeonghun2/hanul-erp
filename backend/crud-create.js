import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://demouser:demo1234@cluster0.t0bqn.mongodb.net/";
const client = new MongoClient(uri);
export async function createUser(employee) {
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");
    const result = await coll.insertOne(employee);
    return result
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
