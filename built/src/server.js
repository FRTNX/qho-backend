import { config } from './../config/config';
import app from './express';
import * as mongoose from 'mongoose';
// mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
// comment out listener to get verbose error
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});
app.listen(config.port, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server running on http://localhost:${config.port}/`);
    }
});
