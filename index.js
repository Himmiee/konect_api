const express = require('express')
const bodyParser = require('body-parser');
const ngoRoutes = require('./routes/app-routes')
const cors = require('cors');

const app = express();
const port = process.env.PORT || '3090';



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/ngo',ngoRoutes)
app.use(cors({
    origin : "http://localhost:3000"
}))


app.get('/', (req, res) => {
    res.send("it works lol.")
})

app.listen(port, () => {
    console.log("server started with port", port)
})