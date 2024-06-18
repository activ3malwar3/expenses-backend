import { NextFunction, Request, Response } from 'express'
import controller from './Controller'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const encryptKey = process.env.ENCRYPT_KEY
const jwtKey = process.env.JWT_KEY

/**
 * Verify JWT token
 * @param req
 * @param res
 * @param next
 */
export function verify(req: Request, res: Response, next: NextFunction) {
  const reqToken = req.header('Authorization')
  if (!reqToken) return res.status(401).json(controller.formatResponseForFailure(401, 'Unauthorized'))

  const token = reqToken.split(' ')[1]
  let decoded, decryptedData

  try {
    decoded = jwt.verify(token, jwtKey)
  } catch (error) {
    return res.status(400).json(controller.formatResponseForFailure(400, 'Invalid token'))
  }

  try {
    const bytes = CryptoJS.AES.decrypt(decoded.payload, encryptKey)
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    return res.status(400).json(controller.formatResponseForFailure(400, 'Invalid token'))
  }

  req.user = decryptedData
  next()
}
