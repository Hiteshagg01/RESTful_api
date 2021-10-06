const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/wikiDB';


const mongoConnect = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log(`> Connected to mongodb on ${mongoURI}`);

    } catch (error) {
        console.log(`> Failed to connect to mongodb on ${mongoURI} \n ${error}`);
    }
}

module.exports = mongoConnect