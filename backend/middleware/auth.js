import jwt from 'jsonwebtoken'

export const auth = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ userId: decoded.userId });
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
