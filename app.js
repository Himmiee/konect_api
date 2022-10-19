const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');


const ImageModel = require('./models/image-models')
const DonationModel = require('./models/donation-models');
const { request } = require('express');

const app = express();
const port = process.env.PORT || 3090;

mongoose.connect('mongodb://127.0.0.1:27017/konectdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Storage  = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb) => {
        cb(null, file.originalname);
    },
})


const upload = multer({
    storage: Storage
}).single('testImage')

app.get('/', (req, res) => {
    res.send("it works lol.")
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            console.log(err);
        } else {
            const newImage = new ImageModel({
            name: req.body.name,
            // logo: { data: req.body.filename, contentType: 'image/png'},
            category:req.body.category,
            tag: req.body.tag,
            image: { data: req.file.filename, contentType: 'image/png'},
            mission: req.body.mission,
            email: req.body.email,
            phonenumber: req.body.phonenumber
            })
            newImage.save()
            .then(() => res.send("sucessfully uploaded"))
            .catch(err => console.log(err));
        }
    })
})

app.post('/donate', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            console.log(err);
        } else {
            const newDonation = new DonationModel({
            name: req.body.name,
            orgName:req.body.orgName,
            image: { data: req.file.filename, contentType: 'image/png'},
            detail: req.body.detail,
            category: req.body.category
            })
            newDonation.save()
            .then(() => res.send("sucessfully uploaded"))
            .catch(err => console.log(err));
        }
    })
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
app.get('/getDetailInfo', (req, res) => {
    // console.log(req.query);
    ImageModel.find({name:req.query.name}, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
})
app.get('/getDetailSector', (req, res) => {
    // console.log(req.query);
    ImageModel.find({tag:req.query.tag}, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
})

app.get('/getDonations', (req, res) => {
    DonationModel.find({}, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
})

app.get('/getDonation/:name', (req, res) => {
    // console.log(req.params);
    DonationModel.find({name: req.params.name},(err, results) => {
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