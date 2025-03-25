import { MongoClient } from "mongodb";
export async function GET(request) {
  const uri = MONGODB_ATLAS_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("hr");
    const coll = db.collection("employees");
    const cursor = coll.find(); // .limit(10) - 사용자 정보 10개 제한 (총 21,349개)
    const users = await cursor.toArray();
    return users;
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}