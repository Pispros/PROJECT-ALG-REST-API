/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        useMongoClient: true,
        uri: process.env.MONGODB_URI || 'mongodb+srv://user1:passer@cluster0.emog0.mongodb.net/aglprojet-dev?authSource=admin'
    },

    // Seed database on startup
    seedDB: true,
};
