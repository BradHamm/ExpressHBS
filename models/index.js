const User = require('./User');
const Bookmark = require('./Bookmark');

User.hasMany(Bookmark, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
}); //User has one to many relationship with bookmarks

Bookmark.belongsTo(User, {
    foreignKey: 'user_id'
}); //Bookmarks each belong to one individual user