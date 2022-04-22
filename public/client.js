
let retryCount=0
const elementDom ={
    "messagesContainer" : document.querySelector('.message__display'),
    "inputElement": document.querySelector("input[type='text']"),
    "buttonElement" : document.querySelector('.input-button')
}

const INTERVAL = 3000

const buildUI = dataObj => `<div class="messages">
                <h3 class="name">${dataObj.name}</h3>
                <p class="'Message">${dataObj.text}<span class="date"> (${(new Date(dataObj.date)).toDateString()})</span></p>
            </div>`
            

            
const render = (data) =>{
    const messagesMap = data.map(dataObj=> buildUI(dataObj))
    
    elementDom.messagesContainer.innerHTML = messagesMap.join('')
}








if(elementDom.buttonElement){
    
    elementDom.buttonElement.addEventListener('click', async ()=>{
        
        const value = elementDom.inputElement.value
        
        const options = {
            method:"post",
            body:JSON.stringify({
               "messages" : value 
            }),
            "headers":{
                "Content-Type":"application/json"
            }, 
        }
        
        await fetch('/poll',options)     
    })
    
    
}



const receiveMessages = async  ()=>{
    
    let data;
    try{
        const dataJSON = await fetch('/poll');
          data = await dataJSON.json()
        if(dataJSON.status === 500) throw new Error('an error occured on the server')
        render(data.messages) 
        retryCount=0   
    }catch(error){
        console.error("an error ocured in fetchig messages",error)
        retryCount++
    }
    
}


let timeTillNextAnimation = 0


const sendMessages = async(time)=>{
    
    if(timeTillNextAnimation<=time){
        await receiveMessages()
        timeTillNextAnimation = timeTillNextAnimation  + INTERVAL + retryCount * 5000
        
    }
    requestAnimationFrame(sendMessages)
}


requestAnimationFrame(sendMessages)