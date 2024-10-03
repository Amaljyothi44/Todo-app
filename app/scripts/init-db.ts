import { open } from 'sqlite';
import { Database } from 'sqlite3';  // Corrected import

// Initialize SQLite database connection
async function initializeDatabase() {
    const db = await open({
        filename: './todoapp.db',
        driver: Database
    });

    // Create tasks table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL
        );
    `);

    console.log('Database initialized successfully');
    await db.close();
}

initializeDatabase().catch((err) => {
    console.error('Failed to initialize database:', err);
});
