import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "./api/tasks";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/router';
import { getToken } from '../utils/auth';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
    } else {
      async function loadTasks() {
        const data = await fetchTasks();
        setTasks(data);
      }
      loadTasks();
    }
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
    setNewTask("");
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    const updatedTask = await updateTask(id, { completed: !completed });
    setTasks(tasks.map((task: any) => (task.id === id ? updatedTask : task)));
  };

  return (
    <Container maxWidth="sm">
      
      <h1>タスク管理</h1>
      <TextField
        label="新しいタスク"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} startIcon={<AddIcon />} fullWidth>
        追加
      </Button>
      <List>
        {tasks.map((task: any) => (
          <ListItem key={task.id} divider>
            <ListItemText primary={task.title} secondary={task.completed ? "完了" : "未完了"} />
            <IconButton onClick={() => handleToggleTask(task.id, task.completed)} color="primary">
              <CheckCircleIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      
    </Container>
  );
}
