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
    
    

    useEffect(()=> {
        const TaskData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/todos`, {next : {revalidate:10}});

            const tasks : Task[] = await res.json();
            setTasks(tasks);
        }
        TaskData();
    },[])

    // Used Local Storge - 
    //Load data from Local, once on mount
    useEffect(()=> {
        const storeTasks = localStorage.getItem('tasks');
        if (storeTasks) {
            setTasks(JSON.parse(storeTasks));
        }
    },[])
    //sync task whenever changes
     useEffect(() => {
        if(tasks.length){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
     }, [tasks])

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        addTask(newTask.trim());
        setnewTask('');
    }
    //add Task function
    const addTask = (taskText: string) => {
        const Task = { id: Date.now().toString(), text: taskText };
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, Task]; 
        // SaveTask(Task);
        return updatedTasks;
    });
    };
    // add to server
//    const SaveTask = async (tasks:Task) => {
//     try {
//         const res = await fetch('/api/tasks', {
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json',
//             },
            
//         });
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.error ('Failed to Save task to server', error)
//     }
//    };


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