import * as dotenv from 'dotenv'
dotenv.config()

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// author
const AUTHOR: string = process.env.AUTHOR || 'Omar Nawito'

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost'
const PORT: number = +process.env.PORT || 1010

// mlab
const MONGO_URL = process.env.MONGO_URL

// jwt
const JWT_TOKEN_SECRET: string =
	process.env.JWT_TOKEN_SECRET || 'access-token-secret'

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10

// nodemailer
const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'xxx'
const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'xxx'

export {
	NODE_ENV,
	AUTHOR,
	DOMAIN,
	PORT,
	MONGO_URL,
	JWT_TOKEN_SECRET,
	BCRYPT_SALT,
	NODEMAILER_USER,
	NODEMAILER_PASS,
}