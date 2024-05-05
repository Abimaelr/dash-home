import { User } from "../../../models/tables.js";
import crypto from 'crypto';

export const LoginService = {
    /**
     * @param {string} username - Nome de usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<boolean>} Retorna true se a autenticação for bem-sucedida, caso contrário, retorna false.
     */
    login: async (username, password) => {
        const user = await User.where({ name: username }).fetch();
        if (!user) {
            return false; 
        }

        const passwordHash = crypto.createHash('md5').update(password).digest('hex');

        if (user.get('password') === passwordHash) {
            const token = jwt.sign({ userId: user.get('id') }, 'seu_segredo_aqui', { expiresIn: '1h' });
            return token; 
        } else {
            return false;
        }
    }
};
