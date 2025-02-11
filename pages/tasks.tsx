import { useEffect, useState } from "react";
import axios from "axios";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        async function loadTasks() {
            const { data } = await axios.get("http://localhost:8000/api/tasks");
            setTasks(data);
        }
        loadTasks();
    }, []);

    async function handleCreate() {
        if (!title.trim()) return;
        await axios.post("http://localhost:8000/api/tasks", { title });
        setTitle("");
        const { data } = await axios.get("http://localhost:8000/api/tasks");
        setTasks(data);
    }

    return (
        <div>
            <h1>タスク一覧</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タスク名" />
            <button onClick={handleCreate}>追加</button>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
