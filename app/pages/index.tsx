import { fetcher } from "../api/router_api.js";
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

export async function getStaticProps() {

  try {
    const todoResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/todos`);
    console.log("Todo Response:", todoResponse);
    return {
      props: {
        todo: todoResponse,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error fetching todo:", error.message);
    } else {
        console.error("Unknown error:", error);
    }
}
}

