import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb+srv://demouser:demo1234@cluster0.t0bqn.mongodb.net/";
const client = new MongoClient(uri);
export async function updateUser(target) {
  console.log("target : ", target)
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");

    const findUpdateEmp = coll.findOne({ _id: new ObjectId(target.id) })
    if (!findUpdateEmp) {
      return {
        updateCount: 0
      }
    }

    const result = await coll.updateOne({ _id: new ObjectId(target.id)}, {$set: target.data});
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
