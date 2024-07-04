import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.0.158:8080/api/auth' });

export const register = (email, password) => API.post('/register', { "email":email, "password":password });
export const login = (email, password) => API.post('/login', { "email":email, "password":password});
export const verifyToken = async (token) => {
    try {
        // Make a request to your backend API to verify the token
        const response = await fetch('http://192.168.0.158:8080/api/auth/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
            // Optionally, send additional data if required by your backend
            body: JSON.stringify({ token }),
        });

        if (response.ok) {
            console.log("response ok")
            return true
        } else {
            // Token is not valid, handle accordingly (e.g., redirect to login screen)
            console.log("response not ok")
            return false
            // Handle error (e.g., redirect to login screen)
        }
    } catch (error) {
            console.error('Error verifying token:', error.message, error.stack);
        return false
        // Handle error (e.g., redirect to login screen)
    }
};
