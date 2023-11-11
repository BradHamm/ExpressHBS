// user models will have a one to many relationship with the bookmarks and contain a multitude of preferences regaring light vs dark mode and utils added onto the dashboard
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,30]
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Please enter a valid email address."
                },
            },
        },
        theme: {
            type: DataTypes.STRING,
            defaultValue: "light",
            allowNull: true, //set up args for validate later
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User;