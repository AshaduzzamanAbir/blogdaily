import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

export async function GET() {
  try {
    await connectDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (err) {
    console.error("faild to fatch email", err);
    return NextResponse.json(
      { error: "internal surver error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await connectDB();
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Delete" });
}
