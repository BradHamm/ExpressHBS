// bookmarks which will have associated icons, links to the website as well as organizational options made by the User depending on how they want them arranged on the profile
const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bookmark extends Model {}

Bookmark.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                max: 20,
            },
        },
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: {
                    msg: "Please enter a valid URL."
                },
            },
        },
        icon: {
            type: DataTypes.STRING,
            //set up default String if none was selected.
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: { //references the id integer for determining the many to one relationship between bookmark and user.
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true, //includes the createdAt attribute automatically upono creation
        freezeTableName: true, //will not pluralize the table
        underscored: true, //will change camelcase to underscored (myExample to my_example) within the database
        modelName: 'bookmark', //name of the model within sequelize
    }
);

Bookmark.addHook('beforeCreate', (bookmark) => {
    if (!bookmark.name) {
        bookmark.name = `Bookmark ${bookmark.id}`
    }
    if (!bookmark.icon) {
        bookmark.icon = `IconWasNotSet`; //helper function here to randomly select an icon if the user does not select one
    }
}

)