const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const dotenv = require('dotenv').config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));