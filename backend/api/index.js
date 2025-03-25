export async function GET(request) {
    // return new Response('Hello from Vercel!');
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  return response.status(200).json({ data });
  }