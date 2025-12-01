import type { Request, Response, NextFunction } from 'express'
import { env } from '../../env.ts'
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  let status = err.status || 500
  let message = err.message || 'Internal server error'

  if (err.name === 'ValidationError') {
    status = 400
    message = err.message
  }

  return res.status(status).json({
    error: message,
    ...(env.APP_STAGE === 'dev' && {
      stack: err.stack,
      details: err.message,
    }),
  })
  // Here is opinion based, you can do whatever you want, call Sentry, etc
}
