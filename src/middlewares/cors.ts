import { NextFunction, Request, Response } from 'express'

export function corsMiddlewares(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.setHeader('Access-Control-Allow-Origin', `${process.env.CORS}`)
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', 'x-app-id')
  next()
}
