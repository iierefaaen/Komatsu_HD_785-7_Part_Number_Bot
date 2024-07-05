/*
- komatsu hd 785-7 part number (20000 & 30000 series)
- using javascript
- with node-telegram-bot-api

@require: node-telegram-bot-api
@require: Token from "Bot Father"

----------------------------------------------------
author: github.com/iierefaaen
----------------------------------------------------
=> On this app we just create bot to send
=> certain "group of part number"
=> we not use database directly from this bot
=> but, we consumee api from other repo
=> (next my repo)

*/


// import require package
const TelegramBot = require('node-telegram-bot-api');
// token from bot father
const TOKEN = "6340529237:AAFNFBGG4xSwYCacdB_InxMI7T1TyWais2U"

const bot = new TelegramBot(TOKEN, {polling: true})


bot.on('message', (msg) => {
  const keyword = msg.text
  const chatId = msg.chat.id
  
  
  // fetch to api
  const apiUrl = "http://localhost:3000/peoples/id/" + parseInt(keyword)

fetch(apiUrl)
  .then(response => {
    // if response NOT OK
    if (!response.ok) {
      console.log('Failed to fetch')
    }
    // if response OK
    return response.json()
  })
  .then(data => {
    // Process the retrieved user data
    let result = data.data // cause data we need place on "data": [{ ... }]
    console.log(result)
    for ( let i = 0; i < result.length ; i++ ){
        //send to user
        bot.sendMessage(chatId, "message here")
    }
  })
  // Catch Error
  .catch(error => {
    console.error("Error fetch : " + error);
  });

})
