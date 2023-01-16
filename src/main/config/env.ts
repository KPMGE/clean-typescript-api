import dotenv from 'dotenv'

dotenv.config()

export const env = {
  mongUri: process.env.MONGO_URI,
  port: process.env.PORT || 3333
}
