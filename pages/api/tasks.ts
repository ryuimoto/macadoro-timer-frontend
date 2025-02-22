import axios from 'axios';
import { api } from "@/utils/api";

export async function fetchTasks(){
    const response = await api.get('/tasks');
    return response.data;
}

export async function createTask(title: string){
    const response = await api.post('/tasks', { title });
    return response.data;
}

export async function deleteTask(id:number){
    await api.delete(`/tasks/${id}`);
}

export async function updateTask(id: number, completed: boolean){
    const response = await api.put(`/tasks/${id}`, { completed });
    return response.data;
}