var mysql= require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydata'
});

connection.connect(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("mysql connected");
  }
});
module.exports=connection;