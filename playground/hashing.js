const {SHA256} =  require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc'
               //rounds
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash)
    })
})

var hashPassword = '$2a$10$4VO05wxERNlimPUiCXJTOe4mCPsd1I0oFMZmIQI1z2Xm6NS1zhupK'

bcrypt.compare(password,hashPassword,(err,result)=>{
    console.log(result)
})

// var data = {
//     id:10
// }
// //123abc some secret stuff
// var token = jwt.sign(data,'123abc') //verify jwt.io
// console.log( token )

// var decoded =  jwt.verify(token,'123abc')
// console.log( 'decoded', decoded)


// var message =  'I am number 3'
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`)
// console.log(`hash: ${hash}`)
//
//
// var data = {
//     id: 4
// }
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if(resultHash == token.hash){
//     console.log("data was not change")
// }else {
//     console.log("data was change, dont trust")
// }