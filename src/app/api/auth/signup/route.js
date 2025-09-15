import connectDB from "../../../db/index.js";
import { User } from '../../../models/user.model.js'

export async function POST(req) {

    try {
        // step-1 
        // connect mongoDB
        await connectDB()

        // step-2
        // get user from body
        const { fullName, email, password } = await req.json();

        // step-3
        // validation not empty
        if ([fullName, email, password].some((field) => field?.trim() === '')) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 })
        };

        // step-4
        // check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 })
        };

        // step-5
        // create user
        const user = await User.create({
            fullName,
            email,
            password
        });

        // step-6
        // remove password from response
        const createdUser = await User.findById(user._id).select('-password');

        // step-7
        // check user creation
        if (!createdUser) {
            return new Response(JSON.stringify({ message: 'Something went wrong while user creation' }), { status: 500 });
        }

        // step-8
        // Return response

        return new Response(
            JSON.stringify({ message: 'User registered successfully', user: createdUser }),
            { status: 201 }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message || 'internal server error' }),
            { status: 500 }
        )
    }
}