//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose',(err,db)=>{
    if(err){
        return console.log("FAILED TO CONNECT");
    }
    console.log("SUCCESS");
    db.collection('Users').findOneAndUpdate({_id : new ObjectID("5990e635f6ca60117cc538cb")},{
        $set: {
            name: "John"
        },
        $inc:{age: 1}
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result)
    })

    // db.close();

})