// importando as variáveis de ambiente
const env = require('../.env')

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf, Markup } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// criando o nosso teclado
const teclado = Markup.keyboard([
  ['🐷 Porco', '🐮 Vaca', '🐑 Carneiro'],
  ['🐔 Galinha', ' 🍳 Ovo'],
  ['🐟 Peixe', '🦐 Frutos do Mar']
]).resize()

// exibindo a mensagem inicial do bot
bot.start(async ctx => {
  const from = ctx.update.message.from
  await ctx.reply(`Seja bem vindo ${from.first_name}`)
  await ctx.reply(
    'Qual bebida você prefere?',
    Markup.keyboard(['🥤 Coca', '🍺 Cerveja']).resize().oneTime()
  )
})

bot.hears(['🥤 Coca', '🍺 Cerveja'], async ctx => {
  await ctx.reply(`Eu também gosto de ${ctx.match}`)
  await ctx.reply('E qual o seu tipo de carne predileto?', teclado)
})

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
