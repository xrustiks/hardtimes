import initDataBase from './db/initDataBase.js';
import express from 'express';

const app = express();

const startServer = async() => {
  try {
    await initDataBase();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.log('Error starting the server: ', error);
  }
}

startServer();