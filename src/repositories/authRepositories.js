import connection from "../db/db.js";
import bcrypt from 'bcrypt';

async function getUserByEmail(email){
    return connection.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])
        
}

async function insertUser(email, password, name) {
    const passwordHash = bcrypt.hashSync(password, 10);

    return connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `, [name, email, passwordHash])
    
}

async function userSession(token, userId){
    return connection.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)',[token, userId]);
}

export { getUserByEmail, insertUser, userSession };