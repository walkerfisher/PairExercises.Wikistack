const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
  },
  { hooks: {
    beforeValidate: (Page) => {
        if(!Page.title){
            Page.slug = (Math.random() + 1).toString(36).substring(7);
          } else {
            Page.slug = Page.title.replace(/\s+/gi,'_').replace(/\W/g, '');
          }
        }
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
  db, Page, User
};