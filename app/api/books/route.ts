import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type BookUpdateInput = {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  hoverText?: string;
};

export async function GET() {
  const client = await clientPromise;
  const db = client.db("books_db");
  const books = await db.collection("books").find().toArray();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, imageBase64, description, link, hoverText } = body;

  const client = await clientPromise;
  const db = client.db("books_db");
  const result = await db.collection("books").insertOne({
    title,
    imageUrl: imageBase64,
    description,
    link,
    hoverText,
  });

  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, title, imageBase64, description, link, hoverText } = body;

  const client = await clientPromise;
  const db = client.db("books_db");

  const updateDoc: BookUpdateInput = {
    title,
    description,
    link,
    hoverText,
  };

  if (imageBase64) {
    updateDoc.imageUrl = imageBase64;
  }

  const result = await db
    .collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });

  return NextResponse.json({ success: result.modifiedCount > 0 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const client = await clientPromise;
  const db = client.db("books_db");

  const result = await db
    .collection("books")
    .deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: result.deletedCount > 0 });
}
