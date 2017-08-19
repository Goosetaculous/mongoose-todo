require('./config/config')
const _ = require('lodash')

const express =  require('express')
const bodyParser =  require('body-parser')


const {mongoose} =  require('./db/mongoose')
const {Todo} =  require('./models/todo')
const {User} =  require('./models/User')
const {ObjectId} = require('mongodb')

var {authenticate} = require('./middleware/authenticate')

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

// POST /users
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password'])
    var user =  new User(body)
    // Users -  model method
    // user.generateAuthToken - instance method

    user.save().then(()=>{
        //res.send(user)
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user) //x-  custom header
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e)
    })
})





app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user)
})




app.listen(port,()=>{
    console.log(`Started up at ${port}`)
})



module.exports = {app}



