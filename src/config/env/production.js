/**
* @name exports
* @static
* @summary Production environment configurations
*/
module.exports = {

  port: process.env.PORT || 3000,

  mongo: {
    db: 'mongodb://mongo/docker-mongoose',
    admin: {
      username: process.env.MONGO_ADMIN_USERNAME,
      password: process.env.MONGO_ADMIN_PASSWORD
    }
  },

  auth: {
    trustProxy: true
  }

};
