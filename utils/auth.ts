import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';

export async function register(name:string, email: string, password: string){
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
}

export async function login(email: string,password: string){
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
}

export function getToken(){
    return localStorage.getItem('token');
}

export async function logout(){
    await axios.post(`${API_BASE_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    localStorage.removeItem('token');
}