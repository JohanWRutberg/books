import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("books_db");

    // Hämta alla böcker som saknar createdAt
    const booksWithoutDate = await db
      .collection("books")
      .find({ createdAt: { $exists: false } })
      .toArray();

    if (booksWithoutDate.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Alla böcker har redan createdAt",
      });
    }

    // Uppdatera varje bok med tidsstämpel från _id
    for (const book of booksWithoutDate) {
      const createdAt = new ObjectId(book._id).getTimestamp();
      await db
        .collection("books")
        .updateOne({ _id: book._id }, { $set: { createdAt } });
    }

    return NextResponse.json({
      success: true,
      updated: booksWithoutDate.length,
      message: `${booksWithoutDate.length} böcker uppdaterades med createdAt`,
    });
  } catch (error) {
    console.error("Backfill error:", error);
    return NextResponse.json(
      { success: false, error: "Ett fel inträffade" },
      { status: 500 }
    );
  }
}
