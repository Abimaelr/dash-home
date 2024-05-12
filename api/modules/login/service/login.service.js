import { User } from "../../../models/tables.js";
import crypto from 'crypto';
import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken'

configDotenv()

export const LoginService = {
    /**
     * @param {string} username - Nome de usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<boolean>} Retorna true se a autenticação for bem-sucedida, caso contrário, retorna false.
     */
    login: async (email, password) => {
        const [user] = await User.query().where('email', '=', email).limit(1)
        if (!user) {
            return false; 
        }

        const passwordHash = crypto.createHash('md5').update(password).digest('hex');
      
        if (user.password === passwordHash) {
            const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h'});
            return token; 
        } else {
            return false;
        }
    }
};
