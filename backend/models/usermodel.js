import localpool from "../config/db.js";

const createUser = async (email, password) => {
    const result = await localpool.query(
        'INSERT INTO user_info (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
    );
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await localpool.query('SELECT * FROM user_info WHERE email = $1', [email]);
    return result.rows[0];
};

export {createUser,getUserByEmail}
