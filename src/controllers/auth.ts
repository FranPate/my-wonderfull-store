import { v4 as uuidv4 } from 'uuid'
import { comparePassword, hashPasswordSync } from '../crypto'
import User from '../models/User.model'

interface RegisterUserBody {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'staff' | 'client'
}

export const registerUser = (body: RegisterUserBody): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = uuidv4()

      let hashedPwd = hashPasswordSync(body.password)

      const user = {
        uuid: userId,
        email: body.email,
        hashedPassword: hashedPwd,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
        visibility: true
      }

      let newUser = await User.create(user)

      resolve(newUser)
    } catch (error) {
      reject(error)
    }
  })
}

export const getUserByEmail = async (email: string): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ where: { email: email } })
      return resolve(user)
    } catch (error) {
      return reject(error)
    }
  })
}

export const getUserByUuid = async (uuid: string): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ where: { uuid: uuid } })
      return resolve(user)
    } catch (error) {
      return reject(error)
    }
  })
}

export const checkUserCredentials = (
  email: string,
  password: string
): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    let user = await getUserByEmail(email)
    if (user) {
      comparePassword(
        password,
        user.hashedPassword,
        (err: Error | null, isMatch: boolean) => {
          if (err) {
            return reject(err)
          }
          if (isMatch) {
            return resolve(user)
          } else {
            return reject('Invalid password')
          }
        }
      )
    } else {
      return reject('User not found')
    }
  })
}
