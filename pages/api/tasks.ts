import axios from 'axios';
import { api } from "@/utils/api";

export async function fetchTasks(){
    const response = await api.get('/tasks');
    return response.data;
}

export async function createTask(title: string){
    return (await axios.post('http://localhost:8000/api/tasks',{title})).data;
}