const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String 
  });

const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse");
    });
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
