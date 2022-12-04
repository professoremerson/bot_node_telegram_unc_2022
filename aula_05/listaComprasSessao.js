// importando as variáveis de ambiente
const env = require('../.env')

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf, Markup } = require('telegraf')

// importando a biblioteca 'Telegraf-Session'
const LocalSession = require('telegraf-session-local')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo obmeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// definindo que o bot utilizará o armazenamento em sessão
bot.use(new LocalSession({ database: 'example_db.json' }).middleware())

// criando um 'Inline Keyboard' dinâmico
const itemsButtons = list =>
  Markup.inlineKeyboard(
    list.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  )

// iniciando a conversa
bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo ${name}!`)
  await ctx.reply('Por favor, escreva os itens que deseja adicionar...\n')
  // criando um 'array' para a listagem dentro
  // da sessão do contexto
  ctx.session.list = []
})

bot.on('text', ctx => {
  let item = ctx.update.message.text
  // adicionando o item à lista da sessão
  ctx.session.list.push(item)
  ctx.reply(
    `O item ${item} foi adicionado a sua lista!`,
    itemsButtons(ctx.session.list)
  )
})

bot.action(/remove (.+)/, ctx => {
  ctx.session.list = ctx.session.list.filter(item => item !== ctx.match[1])
  ctx.reply(
    `${ctx.match[1]} removido da lista!`,
    itemsButtons(ctx.session.list)
  )
})

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
