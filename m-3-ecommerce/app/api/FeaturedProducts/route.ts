import { list } from "../FeaturedProducts/data";

export async function GET() {
    return new Response(JSON.stringify(list));
}