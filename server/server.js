import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
// import consola from 'consola';

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Server started on http://127.0.0.1:${config.port}`);
})
