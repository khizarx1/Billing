import connectDB from "../../db/index.js";

export async function GET() {
    try {
        await connectDB();
        return new Response(JSON.stringify({ message: 'MongoDB connected successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'MongoDB connection failed' }), { status: 500 });
    }
}