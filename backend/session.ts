'use server'

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'; // use env in production
const COOKIE_NAME = 'auth_token';

interface Session {
    id: string;
    userId: number;
    Admin: boolean;
    fresh: boolean;
    expiresIn:number;
}

export async function createSession(userId: number, Admin: boolean = false) {
    const payload: Session = {
        id: crypto.randomUUID(), // session id
        userId,
        Admin,
        fresh: true,
        expiresIn: 1000*60*60*12*7
    };

    const token = jwt.sign(payload, JWT_SECRET,);

    cookies().set(COOKIE_NAME, token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

export async function verifySession(): Promise<{
    admin: boolean;
    session: Session | null;
    user: number;
    error: string;
}> {
    const cookie = cookies().get(COOKIE_NAME);
    console.log("cookie not found" + cookie?.value)
    if (!cookie) return { error: 'No token found', user: -1, admin: false, session: null };

    try {
        const decoded = jwt.verify(cookie.value, JWT_SECRET) as Session;

        if (decoded.fresh != true) {
            console.log(cookie)
            return { error: 'Session expired', user: -1, admin: false, session: null };
        }

        // // Refresh token logic (optional)
        // if (decoded.fresh) {
        //     decoded.fresh = false;
        //     const newToken = jwt.sign(decoded, JWT_SECRET,);
        //     cookies().set(COOKIE_NAME, newToken, {
        //         httpOnly: true,
        //         // secure: process.env.NODE_ENV === 'production',
        //         path: '/',
        //         sameSite: 'lax',
        //         maxAge: 60 * 60 * 24 * 7
        //     });
        // }
        
        return { user: decoded.userId, admin: decoded.Admin, session: decoded, error: '' };
    } catch (e) {
        console.log("cookie invalid")
        console.log(e)
        return { error: 'Invalid token', user: -1, admin: false, session: null };
    }
}

export async function destroySession() {
    cookies().set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 0
    });

    return { success: true, error: '' };
}
