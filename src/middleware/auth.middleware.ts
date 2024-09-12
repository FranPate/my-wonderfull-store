import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { getUserByUuid } from '../controllers/auth'
import dotenv from 'dotenv'

dotenv.config()

export const init = (): void => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.MASTERPASSWORD
  }
  passport.use(
    new JwtStrategy(
      opts,
      (decoded: any, done: (error: any, user?: any) => void) => {
        return done(null, decoded)
      }
    )
  )
}

export const protectWithJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.path == '/products/products' ||
    req.path == '/products/product/search/:title' ||
    /^\/products\/product\/get\/\d+$/.test(req.path) ||
    req.path == '/auth/login' ||
    req.path == '/auth/signup' ||
    req.path.startsWith('/docs')
  ) {
    return next()
  }
  return passport.authenticate('jwt', { session: false })(req, res, next)
}

// TODO Type error
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]

  try {
    let decoded = verify(token, process.env.MASTERPASSWORD) as {
      uuid: string
    }
    let user = await getUserByUuid(decoded.uuid)
    if (user.role === 'client') {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
