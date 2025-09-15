import connectDB from "../../../db/index.js";
import { User } from '../../../models/user.model.js'

export async function POST(req) {

    try {
        // step-1 
        // connect mongoDB
        await connectDB()

        // step-2
        // get user from body
        const { email, password } = await req.json();

        // step-3
        // validation not empty
        if ([email, password].some((field) => field?.trim() === '')) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 })
        };

        // step-4
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
        };

        // step-5
        // Match password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 401 })
        }

        // step-6
        // response return (without password)
        const loggedInUser = await User.findById(user._id).select('-password');

        // step-7 
        // return response
        return new Response(
            JSON.stringify({ message: 'User logged in successfully', user: loggedInUser }),
            { status: 200 }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message || 'internal server error' }),
            { status: 500 }
        )
    }
}