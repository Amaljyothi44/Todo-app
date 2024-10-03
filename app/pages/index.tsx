import InputTask from "./InputTask";

const Todo : React.FC=()=> {
  return (
    <div className="p-5 text-center ">
      <h1 className="text-5xl font-bold">Todo List</h1>
      <InputTask />
    </div>
  )
}

export default Todo;