import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import * as authRepositories from '../repositories/authRepositories.js';

async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const validUser = await authRepositories.getUserByEmail(email);

        if(validUser.rowCount > 0){
            return res.sendStatus(409)
        }

        await authRepositories.insertUser(email, password, name);

        res.sendStatus(201)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function signIn(req, res){
    const { email, password } = req.body;

    try{

        const validateUser = await authRepositories.getUserByEmail(email);

        if(validateUser.rowCount === 0){
            return res.sendStatus(401);
        }

        const passwordIsValid = bcrypt.compareSync(password, validateUser.rows[0].password);
        
        if(validateUser && passwordIsValid){
            const token = uuid();
            const body = {token: token};

            await authRepositories.userSession(token, validateUser.rows[0].id);

            return res.status(200).send(body);
        }
        

        res.sendStatus(401);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}


export { signUp, signIn };