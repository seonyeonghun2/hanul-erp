import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db('yourDatabaseName');
    const employees = database.collection('employees');

    switch (req.method) {
      case 'PUT':
        const updatedEmployee = req.body;
        const updateResult = await employees.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedEmployee }
        );
        res.status(200).json(updateResult);
        break;
      
      case 'DELETE':
        const deleteResult = await employees.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(deleteResult);
        break;
      
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}