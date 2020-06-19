require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const accountSid = process.env.TWILIO_SID;
const auth = process.env.TWILIO_AUTH;
const Client  = require('twilio')(accountSid,auth);

 router.post('/sendmessage', function(req,res){
    Client.messages
    .create({
     body : req.body.messageBody,
     from : process.env.TWILIO_PHONE_NUMBER,
     to : req.body.number
    })
    .then(calls => res.json({status : 200, message : 'sms sent successfully', sid : calls.sid}))
    .catch(err => res.json({status : 400, message : 'Failed to send sms, error : err.code'}))
})
   

module.exports = router;





 