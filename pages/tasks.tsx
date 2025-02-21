import { useEffect, useState } from "react";
import axios from "axios";
import { fetchTasks } from './api/tasks';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            const data = await fetchTasks();
            setTasks(data);
        }
        getTasks();
    }, []);

    return (
        <div>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>{task.title} {task.completed && '✓'}</li>
                ))}
            </ul>
        </div>
    );
}
