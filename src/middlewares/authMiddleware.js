import signUpSchema from "../schemas/authSchemas.js";

export default function validateSignUp(req, res, next){
    const { name, email, password, confirmPassword } = req.body;

    const isValid =  signUpSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});

    if(isValid.error){
        return res.status(422).send(isValid.error.message);
    }

    if(password !== confirmPassword){
        return res.status(422).send('As senhas devem ser iguais')
    }

    next();
}
