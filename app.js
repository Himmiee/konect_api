const express = require('express')
const bodyParser = require('body-parser');
const ngoRoutes = require('./routes/app-routes')


const app = express();
const port = process.env.PORT || '3090';
const ImageModel = require('./models/image-models')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/ngo',ngoRoutes)


app.get('/', (req, res) => {
    res.send("it works lol.")
})

app.get('/getDetails', (req, res) => {
    ImageModel.find({}, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
})

app.listen(port, () => {
    console.log("server started with port", port)
})