import InputTask from "./InputTask";

interface TodoProps {}

const Todo : React.FC<TodoProps>=()=> {
  return (
    <div className="p-5 text-center ">
      <h1 className="text-5xl font-bold">Todo List</h1>
      <InputTask />
    </div>
  );
}

export default Todo;