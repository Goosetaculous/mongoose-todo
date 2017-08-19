var express =  require('express')
var bodyParser =  require('body-parser')

var {mongoose} =  require('./db/mongoose')
var {Todo} =  require('./models/todo')
var {User} =  require('./models/User')
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



app.listen(port,()=>{
    console.log(`Started up at ${port}`)
})



module.exports = {app}



