// importando as variáveis de ambiente
const env = require('../.env')

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from
  ctx.reply(
    `Seja bem vindo(a) ${from.first_name}!\nAvise se precisar de /ajuda!`
  )
})

bot.command('ajuda', ctx => {
  ctx.reply(
    '/ajuda: Vou mostrar as opções: ' +
      '\n/ajuda2: para testar via hears' +
      '\n/opcao1: opção genérica 1' +
      '\n/opcao2: opção genérica 2' +
      '\n/opcao3: opção genérica 3'
  )
})

bot.hears('ajuda2', ctx => {
  ctx.reply(
    'Eu também consigo capturar comandos via hears ' +
      'mas utilize o padrão /ajuda2 para facilitar e ser interpretado ' +
      'como um comando mesmo!'
  )
})

bot.hears(/opcao(1|2)/i, ctx => {
  ctx.reply('Resposta padrão para comandos genéricos!')
})

bot.startPolling()
