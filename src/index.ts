import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose, { Error } from 'mongoose'
import dotenv from "dotenv"

dotenv.config();

const app = express()

app.use(
    cors({
        credentials: true
    })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Server Running on http://localhost:8080')
})

const mongoURL = process.env.MONGO_URL

mongoose.Promise = Promise;
mongoose.connect(mongoURL)
mongoose.connection.on("error", (error: Error) => console.log(error))