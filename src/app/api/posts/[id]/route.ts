// src/app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const { content, imageUrl } = await request.json();

  const post = await prisma.post.update({
    where: { id },
    data: {
      content,
      imageUrl,
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Post deleted successfully" });
}