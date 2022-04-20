import express  from 'express'
import nanobuffer from 'nanobuffer'

const app = express()


app.use(express.json())

const msgs = new nanobuffer(50)

const getMessages = ()=> Array.from(msgs).reverse()

msgs.push({
    name:"juls",
    text:"hello friends",
     date: Date.now()
})


app.get('/poll',(req,res)=>{
    res.status(200).json({
      status:'ok',
      messages: getMessages()
    })
})

app.post('/poll',(req,res)=>{

    const {messages} = req.body

    const [name,text] = messages.split(' ')
    
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