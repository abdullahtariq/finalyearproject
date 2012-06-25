var dateFormat = require('dateformat');
var now = new Date(); 
var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'mydb';

var client = mysql.createClient({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS
});
client.query('use ' + DATABASE, function(err, result) {
	if (err) {
		throw err;
	} else {
		console.log("Database created" + result);
	}
});

exports.home = function(req, res) {
	res.redirect('/login');
};

exports.home_post_handler = function(req, res) {
	// message will be displayed on console
	console.log(req.body.message);

	// send back the json of the message received via the textbox
	res.json(req.body.message);
	// OR
	//res.send(200);// send 200 for server processing complete
};

exports.login = function(req, res) {

	res.render('login', {
		title: 'login to your system'
	});
};
exports.signup = function(req, res) {
	res.render('signup', {
		title: 'signup new user'
	});
}
exports.putdata = function(req, res) {
	console.log(req.body.firstname);
	var data = {
		firstname: '',
		lastname: ''
	};
	data.firstname = req.body.firstname;
	data.lastname = req.body.lastname;
	res.json(data);
};

exports.authenticate = function(req, res) {
	//client.query("SELECT * FROM login WHERE username='yawar' AND password='shah' ",
	console.log("username:"+req.body.txtLogin);
	console.log("password:"+req.body.txtPassword);
	 client.query("SELECT * FROM login Where username='"+ req.body.txtLogin + "'" +" AND  password='"+req.body.txtPassword+"';",
	function(err,results,fields){
		if(err){throw err};
		if(results[0]){
			console.log("Loged In");  
			req.session.userInfo = results[0];
			req.session.is_logged_in = true;
			console.log(results[0].code);
			res.json(results[0].code);
			//res.redirect('/message');
			}
			else {
				res.redirect('/wrong');
			}
		});
};

function guidGenerator() {
	var S4 = function() {
			return (((1 + Math.random()) * 0x1000) | 0).toString(16).substring(1);
		};
	return (S4() + S4() + S4());
}

exports.insert = function(req, res) {
	var _guid = guidGenerator();
	client.query('INSERT INTO login (username,password,code) VALUES ("' + req.body.txtUser + '","' + req.body.txtPassword + '","' + _guid + '")', function(err, result) {
		if (err) {
			console.log("error in insertion:" + err.message);
		}
		else {
			console.log("query executed");
			res.json("ur unique id:" + _guid);
		}

	});
}

exports.message = function(req, res) {
	if(req.session.is_logged_in === true){
		console.log(req.session.is_logged_in);
	
	res.render('message',{
		title:'ur message'
	});
	
	}
	else {
		res.redirect('/wrong');
		}
}


exports.display = function(req, res) {
		

	console.log(req.body.txtmsg);
	client.query('INSERT INTO commands (code,command_text) VALUES ("' + req.session.userInfo.code + '","' + req.body.txtmsg + '")');
	msg = req.body.txtmsg;
	res.json(msg);
}
exports.select = function(req, res) {
	client.query('SELECT * FROM login', function selectCb(err, results, fields) {
		if (err) {
			console.log("ERROR" + err.message);
			throw err;
		} else {
			console.log("Got" + results.length + "ROWs:");
			console.log(results);
			console.log(fields);
			res.json(results);
		}
	});
	
	//console.log(time);
}

exports.wrong = function(req , res){
		res.json("Wrong Password Or User Name ");
	}
exports.querymessage = function(req,res){
	
	res.render('querymessage', {
		title: 'query to get the command'
	});
	
}
exports.query = function(req,res){
	var time = timeGenerator();
	client.query("UPDATE commands SET query_send='"+time+"' WHERE code='"+req.body.txtQuery+"';");
	client.query("SELECT * FROM commands WHERE code='"+ req.body.txtQuery+"';",
	function(err,results,fields){
		if(err){
			console.log("ERROR:"+err.message);		
			}
			if(results[0]){
				console.log(results[0].command_text);
				res.json(results[0].command_text);
			}
	} )
}
function timeGenerator(){
	var _time =dateFormat(now,"dddd, mmmm dS, yyyy, h:MM:ss TT");
	return _time;
}
