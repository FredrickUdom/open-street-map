import express from 'express';
import placesRouter from './routes/places';

const app = express();
app.use(express.json());

// Use the /api/places route for places API
app.use('/api/places', placesRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
