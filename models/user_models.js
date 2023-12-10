import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

const User = db.define('users', {
    user_name: {
        type: DataTypes.STRING
    },
    user_email: {
        type: DataTypes.STRING
    },
    user_password: {
        type: DataTypes.STRING
    },
    user_subscribe: {
        type: DataTypes.ENUM('TRUE', 'FALSE')
    }
})

export default User