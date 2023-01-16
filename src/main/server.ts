import { env } from "./config/env"
import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper"
import { app } from "./config/app"

MongoHelper.connect(env.mongUri)
  .then(() => {
    console.log('mongodb connected!')
    app.listen(env.port, () => console.log(`server running at: http://localhost:${env.port}`))
  })
  .catch(err => console.error('[ERROR]: ', err))
