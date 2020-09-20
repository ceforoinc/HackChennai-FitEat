const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')
const fitnessRouter = require('./routes/fitness')
const mealsRouter = require('./routes/meals')

dotenv.config({ path: './config/config.env' });

connectDB();
// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/fitness', fitnessRouter);
app.use('/api/v1/meals', mealsRouter);

app.get('/', (req, res) => {
    res.send('Hey there what up');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has been started on Port ${PORT}`);
});
