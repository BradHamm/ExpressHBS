// user models will have a one to many relationship with the bookmarks and contain a multitude of preferences regaring light vs dark mode and utils added onto the dashboard
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init (
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,18]
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,18],
            },
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
            allowNull: false,
            defaultValue: "light",
            validate: {
                is: {
                    args: ["dark", "light", "melon", "berry"]
                }
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User;