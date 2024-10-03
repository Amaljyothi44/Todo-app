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

export async function DELETE(req: Request) {
  try {
    const db = await getDb();
    await db.run('DELETE FROM tasks');
    return NextResponse.json({ message: "All tasks deleted" }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete tasks:', error);
    return NextResponse.json({ message: 'Failed to delete tasks' }, { status: 500 });
  }
}
