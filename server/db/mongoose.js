var mongoose =  require('mongoose')

mongoose.Promise =  global.Promise; // use promises
// connecting
mongoose.connection.openUri('mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose')


module.exports = {mongoose}