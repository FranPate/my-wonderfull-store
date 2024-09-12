import { Request, Response } from 'express'
import {
  checkUserCredentials,
  getUserByEmail,
  registerUser
} from '../controllers/auth'
import { sign, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let user = await getUserByEmail(req.body.email)
    if (user) {
      return res.status(409).json({ message: 'The email is already in use' })
    }
    let newUser = await registerUser(req.body)
    res.status(201).json({ data: newUser })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let user = await checkUserCredentials(req.body.email, req.body.password)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    let token = sign({ uuid: user.uuid }, process.env.MASTERPASSWORD)
    res.status(200).json({ token: token, role: user.role })
    let decoded = verify(token, process.env.MASTERPASSWORD)
  } catch (error) {
    return res.status(401).json({ error })
  }
}
