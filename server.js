// Express Stuff
const express = require("express");
const app = express();

// Body Parser Configuration

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// CORS configuration
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));


// Router
const router = require("./routes/router");
app.use('/', router);



// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
