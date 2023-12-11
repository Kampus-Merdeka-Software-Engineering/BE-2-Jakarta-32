import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

const Berita = db.define('berita', {
    kategori: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    urlToImage: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT
    }
},
{
    timestamps: true
})

export default Berita