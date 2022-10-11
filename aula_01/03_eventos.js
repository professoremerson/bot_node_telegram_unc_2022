// importando as variáveis de ambiente
const env = require('../.env')

// importando a biblioteca 'Telegraf'
const { Telegraf } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// iniciando o bot
bot.start(ctx => {
  const name = ctx.update.message.from.first_name
  ctx.reply(`Seja bem vindo ${name}! 
      Eu sou um 'bot' em treinamento!
      Por enquanto eu:
          - repito o que você digita
          - digo as coordenadas de latitude e longitude se você me fornecer uma localização
          - retorno o nome e o telefone de um contato que você me fornecer
          - ouço uma mensagem e áudio e retorno a duração dela
          - informo a resolução das fotos que você me enviar (cuidado hein =p)`)
})

// dando continuidade à conversa

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
