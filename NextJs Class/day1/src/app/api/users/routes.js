export async function GET() {
  return Response.json({ name: "Pawan", role: "Developer" });
}

export async function POST(req) {
  const body = await req.json();
  return Response.json({
    message: "User created",
    body,
  });
}
