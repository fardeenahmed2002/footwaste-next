import jwt from 'jsonwebtoken';

export const userAuth = async (req) => {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return {
                authorized: false,
                error: 'Not authorized, login again',
            };
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            authorized: true,
            userid: decoded.id,
        };
    } catch (error) {
        console.log('Auth error:', error.message);
        return {
            authorized: false,
            error: 'Invalid or expired token, please login again',
        };
    }
};
