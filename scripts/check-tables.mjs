import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

try {
  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;
  console.log('Tables found:', tables.length);
  for (const t of tables) {
    console.log(' -', t.table_name);
  }
  await sql.end();
} catch (e) {
  console.error('DB error:', e.message);
  process.exit(1);
}
