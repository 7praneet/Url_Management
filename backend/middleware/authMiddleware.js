import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const authMiddleware = (req, res, next) => {
const auth = req.headers.authorization || '';
if (!auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
const token = auth.split(' ')[1];
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // { id }
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
};