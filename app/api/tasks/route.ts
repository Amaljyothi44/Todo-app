import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';


const dbPath = path.resolve('todoapp.db');

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

const getDb = async () => {
  const db = await dbPromise;
  return db;
};

export async function GET() {
  try {
    console.log("haiii")
    const db = await getDb();
    const tasks = await db.all('SELECT * FROM tasks');
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const db = await getDb();
    const body = await req.json();
    const { id, text } = body;
    if (!id || !text) {
      return NextResponse.json({ message: "Task data is incomplete" }, { status: 400 });
    }
    await db.run('INSERT INTO tasks (id, text) VALUES (?, ?)', [id, text]);
    return NextResponse.json({ message: "Task saved", task: { id, text } }, { status: 200 });
  } catch (error) {
    console.error('Failed to save task:', error);
    return NextResponse.json({ message: 'Failed to save task' }, { status: 500 });
  }
}

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const db = await getDb();
//     const { id } = params;
//     if (!id) {
//       return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
//     }

//     const taskToDelete = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
//     if (!taskToDelete) {
//       return NextResponse.json({ message: "Task not found" }, { status: 404 });
//     }

//     await db.run('DELETE FROM tasks WHERE id = ?', [id]);
//     return NextResponse.json({ message: "Task deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to delete task' }, { status: 500 });
//   }
// }


