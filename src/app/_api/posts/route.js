import { NextResponse } from "next/server";
import prisma from "../../_utilities/connect";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
  
    const storyPage = searchParams.get("storyPage");
    const cat = searchParams.get("cat");
  
    const POST_PER_PAGE = 2;
  
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (storyPage - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };
    
    try {
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where }),
      ]);
      return new NextResponse(JSON.stringify({ posts, count }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };