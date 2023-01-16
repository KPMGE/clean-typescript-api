import dotenv from 'dotenv'

dotenv.config()

export const env = {
  mongUri: process.env.MONGO_URL,
  port: process.env.PORT || 3333
}
