// importando as variáveis de ambiente
const env = require('../.env')

// importando as bibliotecas 'Telegraf', e 'Markup'
const { Telegraf, Markup } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

let contagem = 0

const botoes = Markup.inlineKeyboard(
  [
    Markup.button.callback('+1', 'Adicionar 1'),
    Markup.button.callback('+10', 'Adicionar 10'),
    Markup.button.callback('+100', 'Adicionar 100'),
    Markup.button.callback('-1', 'Remover 1'),
    Markup.button.callback('-10', 'Remover 10'),
    Markup.button.callback('-100', 'Remover 100'),
    Markup.button.callback('Resultado', 'Result'),
    Markup.button.callback('Zerar', 'Reset')
  ],
  { columns: 3 }
)

bot.start(async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo ${nome}!`)
  await ctx.reply(`A contagem atual está em ${contagem}!`, botoes)
})

bot.action(/Adicionar (\d+)/, ctx => {
  contagem += parseInt(ctx.match[1])
  ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action(/Remover (\d+)/, ctx => {
  contagem -= parseInt(ctx.match[1])
  ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action('Reset', ctx => {
  contagem = 0
  ctx.reply(`A contagem atual está em: ${contagem}`, botoes)
})

bot.action('Result', ctx => {
  ctx.answerCbQuery(`A contagem atual está em: ${contagem}`)
  ctx.reply('teste', botoes)
})

bot.startPolling()
