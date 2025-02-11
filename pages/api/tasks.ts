import axios from 'axios';

export async function fetchTasks(){
    // return(await axios.get('http://localhost:8000/api/tasks')).data;

    const { data } = await axios.get("http://localhost:8000/api/tasks");
    console.log("Fetched tasks:", data);  // レスポンスを確認
    return data;  // data が直接配列ならそのままでOK
}

export async function createTask(title: string){
    return (await axios.post('http://localhost:8000/api/tasks',{title})).data;
}