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
        darkmode: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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