import { NextRequest, NextResponse } from "next/server";
import { subscribe } from "@/lib/mailchimp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, whatBuilding } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await subscribe({ email, firstName, whatBuilding });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
