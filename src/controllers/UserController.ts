import { Request, Response } from 'express';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import supabase from '../database';
import User from '../beans/User';
import { PostgrestError } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// [Start of] Requests body types

interface CreateUserReqBody {
  email: string,
  password: string
}

interface LoginUserReqBody {
  email: string,
  password: string
}

// [End of] Requests body types
// [Start of] Response body types
// empty
// [End of] Response body types

export default class UserController {
  async getAll(req: Request, res: Response) {
    const { data: users_data, error } = await supabase
      .from('User')
      .select('*') as {
        data: User[], error: PostgrestError | null
      };
    if (error) {
      const msg = "[UserController.register] Error selecting all users";
      return res.status(500).json({ msg, users_data });
    }
    return res.status(200).json({ msg: "sucesso", users_data });
  }

  async register(req: Request, res: Response) {
    const { email, password }: CreateUserReqBody = req.body;

    // Select repeated emails
    const { data: users_with_equal_email, error: selectError } = await supabase
      .from('User')
      .select(`email`)
      .eq('email', email);
    if (selectError) {
      const msg = "[UserController.register] Error checking email uniqueness";
      return res.status(500)
        .json({ msg, id: NIL_UUID });
    }

    // Check for repeated email
    const isRepeated = users_with_equal_email.length > 0;
    if (isRepeated) {
      const msg = "[UserController.register] Email already in use";
      return res.status(400)
        .json({ msg, id: NIL_UUID });
    }

    // Create new user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const id = uuidv4()
    const { error: insertError } = await supabase
      .from('User')
      .insert({ id, email, password: hashedPassword });
    if (insertError) {
      console.log(insertError);
      const msg = "[UserController.register] Error inserting new user";
      return res.status(500)
        .json({ msg, id: NIL_UUID });
    }

    // console.log("aqui, registrou novo user");
    return res.status(200)
      .json({ msg: 'New user created!', id });
  }

  async login(req: Request, res: Response) {
    const { email, password }: LoginUserReqBody = req.body;

    // console.log(email)
    // console.log(password);

    // Select existing user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { data: existing_user, error: selectError } = await supabase
      .from('User')
      .select(`*`)
      .eq('email', email);
    // .eq('password', password);
    if (selectError) {
      return res.status(500)
        .json({ msg: 'Error selecting existing user', id: NIL_UUID });
    }
    console.log(`existing_user->${existing_user}`);
    if (!existing_user || !existing_user[0]) {
      const msg = "Invalid Email";
      return res.status(500)
        .json({ msg, id: NIL_UUID });
    }

    // console.log(existing_user);
    // console.log(selectError);

    // Check for valid credentials
    const passwordsMatch = (
      await bcrypt.compare(password, existing_user[0].password)
      || password === existing_user[0].password
    );
    if (!passwordsMatch) {
      return res.status(401)
        .json({ msg: 'Invalid Password', id: NIL_UUID });
    }

    console.log("final, Login bem-sucedido");

    // Se chegou até aqui, significa que o login foi bem-sucedido
    return res.status(200)
      .json({ msg: 'Login bem-sucedido', id: existing_user[0].id });
  }
}
