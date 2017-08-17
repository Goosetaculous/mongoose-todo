const {ObjectId} = require('mongodb')


const {mongoose} =  require('./../server/db/mongoose')
const {Todo} =  require('./../server/models/todo')
const {User} =  require('./../server/models/user')

// var id = 'dsafadsf'
//
// if( !ObjectId.isValid(id) ){
//     console.log( "id is not valid")
// }

var id = 'fdsa'

// Todo.find({
//     _id : id
// }).then((todos)=>{
//     console.log('Todos', todos)
// })
//
// Todo.findOne({
//     completed : false
// }).then((todos)=>{
//     console.log('todo', todos)
// })


// Todo.findById(id).then((todos)=>{
//     if(!todo){
//         return console.log('id not found')
//     }
//     console.log('todos by id', todos)
// }).catch((e)=>console.log(e))

// ObjectId("59921c33a410b019168c1e72")

User.findById('59921c33a410b019168c1e72')
    .then((user)=>{
        if(!user){
            return console.log('Unable to find user')
        }
        console.log(JSON.stringify(user,undefined,2))
    },(e)=>{
        console.log(e)
    })