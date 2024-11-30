import { db } from "../../../db/index";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const allUsers = await db.select().from(users);
  return new Response(JSON.stringify(allUsers), { status: 200 });
}

export async function POST(req) {
  const { name } = await req.json();
  await db.insert(users).values({ name });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await db.delete(users).where(eq(users.id, id));

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
