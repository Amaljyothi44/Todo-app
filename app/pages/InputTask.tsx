'use client';
import { useEffect, useState } from "react";
import TaskList from "../components/tasklist/tasklist";

export interface Task {
    id : string;
    text : string;
}

const InputTask = () => {
    const [newTask, setnewTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load data from Local
    useEffect(()=> {
        const storeTasks = localStorage.getItem('tasks');
        if (storeTasks) {
            setTasks(JSON.parse(storeTasks))
        }
    })
    // sync task whenever changes
     useEffect(() => {
        if(tasks.length){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
     })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        addTask(newTask.trim());
        setnewTask('');
    }
    //add Task function
    const addTask = (taskText: string) => {
        const Task = { id: Date.now().toString(), text: taskText };
        setTasks((prevTasks) => [...prevTasks, Task]); 
        SaveTask([...tasks,Task])
    };
    // add to server
   const SaveTask = async (tasks:Task[]) => {
    try {
        await fetch('api/tasks', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(tasks),
        });
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
 <TaskList tasks={tasks} />
</div>
);  
}

export default InputTask;