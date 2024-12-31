import { blogs } from "../LatestProduct/data";

export async function GET() {
    return new Response(JSON.stringify(blogs));
}