const expect =  require('expect')
const request = require('supertest')

const {ObjectID} =  require('mongodb')
const {app} =  require('./../server')
const {Todo} = require('./../models/todo')

//dummy todos
const todos =  [
    {
        _id: new ObjectID(),
        text: 'first test todo'
    },{ _id: new ObjectID(),text: 'second test todo'}]



beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done())
})

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'test todo text'

        request(app)
            .post('/todos')
            .send({text})
            //assertions
            .expect(200)
            //res is the response body
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                //CHECK THE DB
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e)=>done(e))
            })
    })

    it('Should NOT create todo with invalid body datay',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e)=>done(e))
            })
    })

})

describe('GET /todos/:id', ()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{

                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })
    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)

    })

    it('should return 404 for non-object ids',(done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done)
    })
})
