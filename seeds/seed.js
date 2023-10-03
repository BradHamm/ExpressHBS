const sequelize = require('../config/connection');
const { User, Bookmark } = require('../models');

const userData = require('./userData.json');
const bookmarkData = require('./bookmarkData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const bookmark of bookmarkData) {
        await Bookmark.create({
            ...bookmark,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();