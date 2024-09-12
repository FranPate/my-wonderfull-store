import bcrypt from 'bcrypt'

export const hashPassword = (
  plainTextPwd: string,
  done: (err: Error | null, hashedPassword?: string) => void
): void => {
  bcrypt.hash(plainTextPwd, 10, done)
}

export const hashPasswordSync = (plainTextPwd: string): string => {
  return bcrypt.hashSync(plainTextPwd, 10)
}

export const comparePassword = (
  plainPassword: string,
  hashPassword: string,
  done: (err: Error | null, isMatch: boolean) => void
): void => {
  bcrypt.compare(plainPassword, hashPassword, done)
}
