import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const {
    DB_URL
} = process.env

// const db = new Sequelize('healthnews', 'root', '1201',{
//     host: 'localhost',
//     dialect: 'mysql'
// })

const db = new Sequelize( DB_URL, {
    define: {
        timestamps: false
    }
})

export default db