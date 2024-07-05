import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser,getUserByEmail} from '../models/usermodel.js';

const register = async (req, res) => {
    console.log("fetch")
    const { email, password } = req.body;
    console.log(email,password)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stringhashedPassword = hashedPassword.toString('hex');
        const newUser = await createUser(email, stringhashedPassword);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '60d' });
        console.log(token)
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { register, login };
