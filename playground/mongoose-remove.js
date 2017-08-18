const {ObjectId} = require('mongodb')


const {mongoose} =  require('./../server/db/mongoose')
const {Todo} =  require('./../server/models/todo')
const {User} =  require('./../server/models/user')

//remove all

// Todo.remove({}).then((result)=>{
//     console.log(result)
// })

Todo.findOneAndRemove({_id:'599665c442120fdd87a3f9c8'}).then((todo)=>{

})

Todo.findByIdAndRemove('599665c442120fdd87a3f9c8').then((todo)=>{
    console.log(todo)

})