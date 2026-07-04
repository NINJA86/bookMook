import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = newsletterSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    if (process.env.DATABASE_URL) {
      await prisma.subscriber.upsert({
        where: { email: parsed.data.email },
        update: {},
        create: { email: parsed.data.email }
      });
    }
  } catch {
    return NextResponse.json({ error: "Unable to save subscription." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: `Subscribed ${parsed.data.email}`
  });
}
