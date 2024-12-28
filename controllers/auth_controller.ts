import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  usersModel from '../models/users_model';
import usersController from '../controllers/users_controller';

type tTokens ={
    accessToken: string,
    refreshToken: string
}




export const generateToken = (username: string): tTokens => {
    if (!process.env.SECRET_KEY) {
        return null;
    }
    // generate token
    const random = Math.random().toString();
    const accessToken = jwt.sign({
        username: username,
        random: random
    },
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRES });

    const refreshToken = jwt.sign({
        username: username,
        random: random
    },
        process.env.SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

export const verifyToken = async (token: string): Promise<any> => {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY not defined");
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, async (err: any, payload: any) => {
            if (err) return reject(err);

            try {
                // Fetch the user
                const user = await usersModel.findOne({ username: payload.username });
                if (!user || !user.refreshToken || !user.refreshToken.includes(token)) {
                    if (user) {
                        user.refreshToken = [];
                        await user.save();
                    }
                    return reject(new Error("Invalid or expired token"));
                }

                // Remove the current token from the user's refreshToken list
                const tokens = user.refreshToken.filter((t) => t !== token);
                user.refreshToken = tokens;
                await user.save();

                // Resolve the user object
                resolve(user);
            } catch (error) {
                reject(new Error("Invalid or expired token"));
            }
        });
    });
};
const logout = async (req: Request, res: Response) => {
    try {
        const user = await verifyToken(req.body.refreshToken);
        await user.save();
        res.status(200).send("logut success");
    } catch (err) {
        console.log(err);
        res.status(400).send("logout fail");
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  // Check if user exists
  const userExists = await usersModel.findOne({username : username });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newBody = {username: username , email: email , password: hashedPassword};
  const createLog = {
    status: function (code) {
      console.log(`Status set to ${code}`);
      return this;
    },
    send: function (message) {
      console.log(`Message sent: ${message}`);
      return this;
    },
    json: function (data) {
      console.log(`JSON sent: ${JSON.stringify(data)}`);
      return this;
    }
  };
  usersController.createAUser({body:newBody},createLog);
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Find user
  const user = await usersModel.findOne({username : username});
  if (!user) {
    res.status(401).json({ message: 'Invalid username' });
    return;
  }

  // Check password
  const nonHashedPassword = password;
  const isPasswordValid = await bcrypt.compare(nonHashedPassword, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid password' });
    return;
  }

  if(!process.env.SECRET_KEY){
    res.status(500).send('Server Error - key')
    return;
  }

  // Generate JWT
  const token = generateToken( user.username );
  if(!token){
    res.status(500).send('Server Error - token')
    return;
  }

  if(!user.refreshToken){
    user.refreshToken = [];
  }

  user.refreshToken.push(token.refreshToken);
  await user.save();

  res.status(200).send(
    {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        username: user.username
    });
};

export default{
    login,
    register,
    logout
}