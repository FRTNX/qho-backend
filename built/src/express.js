import express from 'express';
import { config } from './../config/config';
import userRoutes from './routes/user.routes';
import playRoutes from './routes/play.routes';
console.log(config);
const app = express();
// app.use(express.json({ limit: config.request.limit }));
app.use(express.urlencoded());
app.use('/', userRoutes);
app.use('/', playRoutes);
// default route
app.use('/', (request, response) => {
    return response.status(200).json({
        message: 'By the pricking of my thumbs, Something wicked this way comes.'
    });
});
export default app;
