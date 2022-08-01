import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// For converting req.body to JSON data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/users', userRouter);

// For sending err for user routes using expressAsyncHandler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
