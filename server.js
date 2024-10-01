const express = require('express');
const app = express();
// require('dotenv').config();

const boadyParser = require('body-parser');
app.use(boadyParser.json());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("listening on port 8000");  
});