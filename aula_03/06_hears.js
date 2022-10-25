// importando as variáveis de ambiente
const env = require('../.env')

// importando a biblioteca 'Telegraf'
const { Telegraf } = require('telegraf')

// importando a biblioteca 'Moment'
const moment = require('moment')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// utilizando o 'hears' com expressão simples
bot.hears('pizza', ctx => {
  ctx.reply('Quero de 4 queijos!')
})

// utilizando o 'hears' com array de expressões
bot.hears(['chuchu', 'moela', 'fígado'], ctx => {
  ctx.reply('Obrigado mas não vou querer!')
})

// utilizando o 'hears' para 'Emojis'
bot.hears('🐷', ctx => {
  ctx.reply('Torresmoooooooo')
})

// utilizando o 'hears' com expressões regulares
bot.hears(/burguer/i, ctx => {
  ctx.reply('Hamburguer... X-Burguer... X-Salada')
})

// utilizando o 'hears' com datas dd/MM/yyyy
bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
  moment.locale('pt-BR')
  const data = moment(ctx.match[1], 'DD/MM/YYYY')
  ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)
})
/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling()
