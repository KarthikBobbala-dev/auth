const express = require('express')
const env = require('dotenv');
env.config();
const registerRoutes = require('./controllers/register');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use('/auth',registerRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});