const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql')
const TOKEN = process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN"

const bot = new TelegramBot(TOKEN, {polling: true})


bot.on('message', (msg) => {
  const keyword = msg.text
  const chatId = msg.chat.id
  let connection = mysql.createConnection({
    host: "HOST",
    user: "USER",
    password: "YOUR_PASSWORD",
    database: "YOUR_DB_NAME"
  })
  
  connection.connect(function(error) {
    if (error) throw error
    // console.log("MYSQL now is connected!...")
    connection.query(`SELECT * FROM YOUR_DB_NAME WHERE keyword LIKE "%${keyword}%"`, function (error, result) {
      if (error){
        throw error
      }
      let pesan = []
      result.forEach(e => pesan.push(e.YOUR_DB_PART_NUM_ROWS))
      pesan.forEach(el => {
        bot.sendMessage(chatId, el)
      })
    }
    )
  })
});
