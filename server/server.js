var  env = process.env.NODE_ENV || 'development'

if(env ==='development'){
    process.env.PORT=3000
    process.env.MONGODB_URI = 'mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose'

}else if(env === 'test'){
    process.env.PORT=3000
    process.env.MONGODB_URI = 'mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/gooseTEST'

}

const _ = require('lodash')

const express =  require('express')
const bodyParser =  require('body-parser')


const {mongoose} =  require('./db/mongoose')
const {Todo} =  require('./models/todo')
const {User} =  require('./models/User')
const {ObjectId} = require('mongodb')

var app =  express()
const port =  process.env.PORT || 3000

app.use(bodyParser.json()) // middleware

app.post('/todos',(req,res)=>{
    var todo =  new Todo({
        text: req.body.text
    })
    todo.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)
    })
})


app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.send({todos});

    },(e)=>{
        res.status(400).send(e)
    })
})

// GET /todos/1234

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if( !ObjectId.isValid(id) ){
        // console.log( "id is not valid")
        return res.status(404).send("404")
    }
    Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.status(404).send("404")
            }
            res.send({todo: todo})
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.delete('/todos/:id',(req,res)=>{
    var id =req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send("404")
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send("404")
        }
        res.send({todo})

    }).catch((e)=>{
        res.status(400).send()
    })

})


app.patch('/todos/:id',(req,res)=>{
    var id =  req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectId.isValid(id)){
        return res.status(404).send("404")
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    }else{
        body.completed =false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo})

    }).catch((e)=>{
            res.status(400).send()
    })

})





app.listen(port,()=>{
    console.log(`Started up at ${port}`)
})



module.exports = {app}



