import { NextResponse } from "next/server";
import prisma from "../../_utilities/connect";

export const GET = async () => {
    try {
        const storyCategories = await prisma.storycategories.findMany();

        return new NextResponse(JSON.stringify(storyCategories));
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        );
    }
}