import express  from 'express'
import nanobuffer from 'nanobuffer'

const app = express()


app.use(express.json())

const msgs = new nanobuffer(50)

const getMessages = ()=> Array.from(msgs)

msgs.push({
    name:"juls",
    text:"hello babe",
     date: Date.now()
})


app.get('/poll',(req,res)=>{
    res.status(500).json({
      messages: getMessages()
    })
})

app.post('/poll',(req,res)=>{

    const {messages} = req.body

    const name = messages.split(' ')[0];
    
    const text = messages.split(' ').slice(1).join(' ')

    msgs.push({
        name,
        text,
        date: Date.now()
    })
    res.json({
        "message":"ok"
    })
})
app.use(express.static('./public'))

export default app