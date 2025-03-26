import { MongoClient, ObjectId } from "mongodb";
export default async function handler(req, res) {
  // single Node.js Serverless Functions CORS 처리
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  // 몽고db 클라이언트 URI
  const {id} = req.query;
  const client = new MongoClient(process.env.MONGODB_URI);
  // 몽고DB 클라이언트 연결 수립
  await client.connect();
  const db = client.db("hr");
  const coll = db.collection("employees");

  // GET 요청 or POST 요청 인지에 따라 서로다른 데이터베이스 요청 처리

  try {
    switch(req.method){
      case 'PUT':
        const updateEmployee = req.body;
        const updateResult = await coll.upodateOne(
          {_id: new ObjectId(id)},
          {$set: updateEmployee}
        )
        res.status(200).json(updateResult);
        break;
      case 'DELETE':
        const deleteResult = await coll.deleteOne({_id: new ObjectId(id)});
        res.status(200).json(deleteResult);
        break;
      default:
        res.setHeader('Allow', ['PUT','DELETE']);
        res.status(405).end(`${req.method}는 허용되지 않습니다!`)
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e.message,
      msg: '서버 통신 오류, 관리자 문의 요망!'      
    })
  } finally {
    await client.close();
  }
}