import { Request, Response } from 'express';
import { users_table } from '../fakeDB';
import { User } from '../beans/User';
import { v4 as uuidv4 } from 'uuid';

export default class UserController {

  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const isRepeated = users_table.filter((user) => user.email === email).length > 0;

    if (isRepeated) {
      res.status(400).json({ msg: 'Email already in use', id: -1 });
    } else {
      users_table.push(new User(uuidv4(), email, password));
      res.status(200).json({ msg: 'New user created!', id: users_table[users_table.length - 1].id });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // const isEmailCorrect = users_table.filter((user) => user.email === email && user.password == password);
    // const isPasswordCorrect = users_table.find((user) => user.password == password);
    const user = users_table.find((user) => user.email === email);

    if (!user) {
      // Caso não exista um usuário com o email fornecido
      return res.status(401).json({ msg: 'Credenciais inválidas', id: -1 });
    }

    if (user.password !== password) {
      // Caso a senha fornecida não corresponda à senha do usuário
      return res.status(401).json({ msg: 'Credenciais inválidas', id: -1 });
    }

    // Se chegou até aqui, significa que o login foi bem-sucedido
    return res.status(200).json({ msg: 'Login bem-sucedido', id: user.id });
  }
}
