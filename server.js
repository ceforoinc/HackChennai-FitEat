const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')
const fitnessRouter = require('./routes/fitness')
const mealsRouter = require('./routes/meals')
const path = require('path')

dotenv.config({ path: './config/config.env' });

connectDB();
// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/v1/fitness', fitnessRouter);
app.use('/api/v1/meals', mealsRouter);
// app.use(express.static("../public/assets"))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('src'))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src/landingpage.html'))
// })
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/landingpage.html'))
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has been started on Port ${PORT}`);
});
