// importando as variáveis de ambiente
const env = require('../.env')

// importando a biblioteca 'Telegraf'
const { Telegraf } = require('telegraf')

// importando a biblioteca 'Axios'
const axios = require('axios')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// tratando eventos de voz com a obtenção do arquivo
bot.on('voice', async ctx => {
  const idFile = ctx.update.message.voice.file_id
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${idFile}`)
  ctx.replyWithVoice({
    url: `${env.apiFileUrl}/${res.data.result.file_path}`
  })
})

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
