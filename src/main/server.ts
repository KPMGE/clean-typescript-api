import express from 'express'

const app = express()

const port = 5050
app.listen(port, () => console.log(`server running at: http://localhost:${port}`))
