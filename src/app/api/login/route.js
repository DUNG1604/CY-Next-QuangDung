import {NextResponse} from 'next/server';
import {userService} from "@/services/userService";

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await userService.login(body);
        // console.log(response);
        const nextResponse = NextResponse.json({success: true, message: 'Logged in successfully'});
        nextResponse.cookies.set('token', response.token);
        nextResponse.cookies.set('name', response.user.name);
        return nextResponse;
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({success: false, message: 'Login failed'}, {status: 401});
    }
}
