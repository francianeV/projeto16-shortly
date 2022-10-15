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
export { signUp };