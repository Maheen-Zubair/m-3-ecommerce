import {  blogs} from "./data";

export async function GET() {
    return new Response(JSON.stringify(blogs));
}