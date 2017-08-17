//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
//
// console.log(obj)


//Object destructuring

var users = {name: "Goose",age: 25};
var {name}= users; //DESTRUCTURED
console.log(name)


MongoClient.connect('mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose',(err,db)=>{
    if(err){
        return console.log("FAILED TO CONNECT");
    }
    console.log("SUCCESS");
    // db.collection('Todos').insertOne({
    //     text: 'Something to do again',
    //     completed: false
    //
    // },(err,result)=>{
    //     if(err){
    //         return console.log("ERROR INSERTING",err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })
    //
    // db.collection('Users').insertOne({
    //     name: 'Goose',
    //     age: 34,
    //     location: "San Diego"
    // },(err,result)=>{
    //     if(err){
    //         return console.log("ERROR INSERTING",err)
    //     }
    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    db.close();

})