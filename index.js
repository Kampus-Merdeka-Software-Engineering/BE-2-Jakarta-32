import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import db from "./config/database.js"
import User from "./models/user_models.js"
import Berita from "./models/berita_models.js"
import router from "./routes/index.js"

dotenv.config()
const app = express()

try{
    await db.authenticate()
    console.log('Database connected...')
    await User.sync()
    await Berita.sync()
}catch (error){
    console.error(error)
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(express.json())
app.use(router)

app.use('/api', router)

app.listen(3300, () => console.log('Server running at port 3300'))