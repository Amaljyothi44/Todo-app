import { Task } from "../../pages/InputTask";

const TaskList = ({
  tasks,
  setTasks,
  setnewTask,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setnewTask: React.Dispatch<React.SetStateAction<string>>;
}) => {
  
  const deleteTask = async (taskId: string | undefined) => {
    if (!taskId) return ;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete task');
      }
      const updatedTasks = tasks.filter((item) => item.id !== taskId);
      setTasks(updatedTasks);

      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const EditTask = (taskId: string | undefined) => {
    if (!taskId) return;

    const task = tasks.find((item) => item.id === taskId);
    if (task) {
      setnewTask(task.text); 
      deleteTask(taskId);   
    }
  };


  return (
    <div>
      <ul className="list-disc ml-6 mt-4">
        {tasks.length === 0 ? (
          <div>No Tasks</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-100 flex flex-row justify-between items-center p-5 mb-2.5 mr-7 rounded-lg shadow-md shadow-white/20"
            >
              <div className="text-black font-bold">{task.text}</div>
              <div>
                <div className="btn btn-outline btn-error" onClick={() => deleteTask(task.id)}>Delete</div>
                <div className="btn btn-outline btn-info ml-2" onClick={() => EditTask(task.id)}>Edit</div>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
