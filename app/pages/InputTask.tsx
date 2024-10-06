'use client';
import { useEffect, useState } from "react";
import TaskList from "../components/tasklist/tasklist";

export interface Task {
    id? : string;
    text : string;
    createdAt?: string;
}

const InputTask = () => {
    const [newTask, setnewTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const TaskData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/todos`, { next: { revalidate: 10 } });
                
                if (!res.ok) {
                    throw new Error('response was not ok');
                }
                const response = await res.json();
                const tasks = await response.data;
                setTasks(tasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
        
        TaskData();
    }, []);
    
    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const taskText = newTask.trim();
        const newTaskObj: Task = { text: taskText };
        setTasks((prevTasks) => [...prevTasks, newTaskObj]);
        setnewTask('');
        SaveTask(newTaskObj);
    }
    // add to server
   const SaveTask = async (tasks:Task) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/todos`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({ data: { text: tasks.text } })
        });
        const data = await res.json()
        console.log('Saved task:', data);
        setTasks((prevTasks) => prevTasks.map(t => t === tasks ? { ...t, id: data.id } : t));

    } catch (error) {
        console.error ('Failed to Save task to server', error)
    }
   };


return (
    <div>
<form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
    <input type="text" 
            className="flex-grow p-2 border rounded"
            value={newTask} 
            onChange={(e)=> setnewTask(e.target.value)}
            placeholder="Add Task"/>
    <button type="submit" className="btn btn-primary bg-violet-600"> Add Task</button>
</form>
  <TaskList tasks={tasks} setTasks={setTasks}  setnewTask = {setnewTask}/>
</div>
);  
}

export default InputTask;