var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "users"
  });

function connectToDb(){
    con.connect(function(err) {
        if (err) throw err;
            console.log("Connected!");
        });
}

function getLengthArr(){
    var arr = new Array();
  
    con.query(`SELECT * FROM users WHERE phonenum = '9639136'`, function (err, result) {
        if (err) throw err;
        arr.push(result.length);
    });
    
    con.query(`SELECT * FROM users WHERE email = 'test@gmail.com'`, function (err, result) {
        if (err) throw err;
        arr.push(result.length);
    });
    return arr;
}

var arr = new Array();

//create a promise
const promise = new Promise(function(resolve, reject){
    con.connect(function(err) {
        if (err) throw err;
        resolve('Connected!');
        });
});

//handling the promise
promise.then(function(value){
    console.log(value);

    //Return another promise: phonenum length
    return new Promise(function(resolve, reject){

        //Get and resolve phonenum length
        con.query(`SELECT * FROM users WHERE phonenum = '9639136'`, function (err, result) {
            if (err) throw err;
            resolve(result.length);
        });

    });
})
.then(function(phoneNumLength){
    arr.push(phoneNumLength);

    //Return another promise: email length
    return new Promise(function(resolve, reject){

        //Get and resolve email length
        con.query(`SELECT * FROM users WHERE email = 'test@gmail.com'`, function (err, result) {
            if (err) throw err;
            resolve(result.length);
        });

    });
})
.then(function(emailLength){
    arr.push(emailLength);
    setTimeout(() => console.log(arr), 5000);
})