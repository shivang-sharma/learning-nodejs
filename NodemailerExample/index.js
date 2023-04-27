var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'testPass'
    }
});

var mailOptions = {
    from: 'email@gmail.com',
    to: 'test@gmail.com',
    subject: 'test subject',
    text: 'test mail body'
}

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent' + info.response);
    }
})