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
const itemsButtons = lista =>
  Markup.inlineKeyboard(
    lista.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  )

// criando um 'middleware' para verificar o usuário
const verificaUsuario = (ctx, next) => {
  const mesmoIdMsg = ctx.update.message.from.id === env.userID

  if (mesmoIdMsg) {
    next()
  } else {
    ctx.reply('Desculpe mas não estou autorizado a conversar com você!')
  }
}

// criando um segundo 'middleware' de exemplo
const loading = (ctx, next) => {
  ctx.reply('Processando ....')
  next()
}

bot.start(verificaUsuario, async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo, ${name}!`)
  await ctx.reply('Escreva os itens que você deseja adicionar...')
  ctx.session.lista = []
})

bot.on('text', loading, verificaUsuario, ctx => {
  let item = ctx.update.message.text
  ctx.session.lista.push(item)
  ctx.reply(
    `${item} foi adicionado a sua lista!`,
    itemsButtons(ctx.session.lista)
  )
})

bot.action(/remove (.+)/, verificaUsuario, ctx => {
  ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
  ctx.reply(
    `${ctx.match[1]} removido da lista!`,
    itemsButtons(ctx.session.lista)
  )
})
/**
 * iniciando o 'polling' com o servidor para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
