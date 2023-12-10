import { Sequelize } from "sequelize"

const db = new Sequelize('healthnews', 'root', '1201',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db