var path = require('path');
var nodemailer=require('nodemailer');

let transporter = nodemailer.createTransport({

	service:'gmail',
	secure:false, 
	port:25,
	auth:{
		user:'sankar00064@gmail.com',
		pass:'Gmail@0064'
	},
	tls:{
		rejectUnathorized:false
	}
});

let HelperOptions={
	from:'"sankar" <sankar00064@gmail.com>',
	to:'sankar00064@gmail.com',
	subject:'my resume',
	meassage:"please find below attaached documents"
};
transporter.sendMail(HelperOptions,(err,info)=>{
	if (err) {
		return console.log(err);
	}
	console.log('message has sent succefully',);
	// console.log(info);
});