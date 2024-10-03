import { Task } from "../../pages/InputTask";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
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
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
