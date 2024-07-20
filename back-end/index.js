const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');


mongoose.set('strictQuery',false);



logger.info("connecting...");


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to mogodb");

        app.listen(config.PORT, ()=> {
            logger.info(`server running on port ${config.PORT}...`);
        });

       
    })
    .catch((error) => {
        logger.error("error connecting to mongodb", logger.error.message);
    });