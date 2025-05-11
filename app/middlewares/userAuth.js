import jwt from 'jsonwebtoken';

export const userAuth = async (req) => {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return {
            authorized: false,
            error: 'Not authorized, login again',
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            authorized: true,
            userid: decoded.id,
        };
    } catch (error) {
        console.log(error.message)
    }
}
