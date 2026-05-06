// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const { content, imageUrl, authorId } = await request.json();

  if (!authorId) {
    return NextResponse.json(
      { message: "Author ID is required" },
      { status: 400 }
    );
  }

  if (!content && !imageUrl) {
    return NextResponse.json(
      { message: "Post must contain text or image" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: {
      content,
      imageUrl,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}