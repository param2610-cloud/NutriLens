import pkg from 'pg';
const { Pool } = pkg;

const localpool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nutrilens',
    password: "#S^9k6B0%N7",
    port: 5432,
});

export default localpool
