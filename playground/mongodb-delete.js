//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose',(err,db)=>{
    if(err){
        return console.log("FAILED TO CONNECT");
    }
    console.log("SUCCESS");
    // deleteMany

    // db.collection('Todos').deleteMany({ text : 'eat lunch'}).then((result)=>{
    //     console.log(result)
    // })

    // Delete one
    // db.collection('Todos').deleteOne({ text : 'eat lunch'}).then((result)=>{
    //     console.log(result)
    // })

    // findone and delete

    // ObjectId("5990e45a9e237511736d9a31")

    db.collection('Users').findOneAndDelete({ _id : new ObjectID("5990e604a0c35b1179b9b769")}).then((result)=>{
          console.log(JSON.stringify(result, undefined, 2))
         })



    // db.close();

})