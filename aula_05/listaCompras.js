// importando as variáveis de ambiente
const env = require('../.env')

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf, Markup } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo obmeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// criando uma variável do tipo 'array'
// para receber os itens da lista
let list = []

// criando um 'Inline Keyboar' dinâmico
const itemsButtons = () =>
  Markup.inlineKeyboard(
    list.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  )

// iniciando a conversa
bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo ${name}!`)
  await ctx.reply('Por favor, escreva os itens que deseja adicionar...\n')
})

// obtendo o item e o transformando em um botão da lista
bot.on('text', ctx => {
  list.push(ctx.update.message.text)
  console.log(list)
  ctx.reply(
    `O item ${ctx.update.message.text} foi adicionado à lista!`,
    itemsButtons()
  )
})

// removendo os itens da lista quando clicar no botão
bot.action(/remove (.+)/, ctx => {
  list = list.filter(item => item !== ctx.match[1])
  ctx.reply(`o item ${ctx.match[1]} foi removido da sua lista!`, itemsButtons())
})

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
