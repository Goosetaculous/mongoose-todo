//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose',(err,db)=>{
    if(err){
        return console.log("FAILED TO CONNECT");
    }
    console.log("SUCCESS");
    // db.collection('Todos').find({
    //     _id: new ObjectID('5990e380566807117262a30d')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2))
    //
    // },(err)=>{
    //     console.log('Unable to fetch to dos ', err)
    // })

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count:${count} `);
    //
    //
    // },(err)=>{
    //     console.log('Unable to fetch to dos ', err)
    // })


    db.collection('Users').find({ name: "Goose"}).toArray().then((result)=>{
        console.log(JSON.stringify(result,undefined,2))

    },(err)=>{
        console.log("error")
    })


   // db.close();

})