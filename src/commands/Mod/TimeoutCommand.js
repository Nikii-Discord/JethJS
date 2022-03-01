const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const ms = require('ms')

module.exports = class Timeout extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'timeout'
    this.aliases = ['timeout', 'tempofora']
    this.category = 'Mod'
  }

  async run(message, args) {
            // Embed erro de permissões:
    const embedA = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MODERATE_MEMBERS`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

            // verifica se user autor da mensagem tem permissão de moderar os membros.
    if (!message.member.hasPermission('MODERATE_MEMBERS')) return message.channel.send(embedA);
            // define o que é user, neste caso user é o primeiro usuário que o autor colocar o ID ou mencionar no chat
    const user = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
            // define qual vai ser o motivo do timeout.
    const reason = args.slice(2).join(' ')
            // define o temporizados do timeout.
    const timer = args[1];
            // aqui define uma condição "se", então se o timer não for definido ele retorna o erro.
    if (!timer) return message.reply('Você não definiu o tempo')
            // aqui define uma condição "se", então se o "user" não for encontrado ele retorna uma mensagem mencionando o autor da mensagem que o usuário não foi encontrado.
    if (!user) return message.reply('eu procurei, procurei, e não achei este usuário')
            // aqui define a condição "se", então caso não seja inserido nenhum motivo junto ao comando irá retornar a mensagem pedindo para adiconar um motivo válido.
    if (reason.length < 1) return message.reply('`Adicione um motivo válido!`')

            // Embed confirmação:
    const embed = new Discord.MessageEmbed()

      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Timeout')
      .setColor('#ff112b')
      .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Usuário:** ${user.username} \n**ID:** ${user.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}` + `\n<:KaelMutado:673592196972412949> **Tempo:** ${timer}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

            // executa o corte de comunicação ou timeout.
    this.client.api.guilds(message.guild.id).members(user.id).patch({
      data: {
        communication_disabled_until: new Date(new Date(Date.now() + Number(timer)).toUTCString()).toISOString()
      },
      reason: reason
    })
            // envia a mensagem de confirmação
    message.channel.send(embed)

  }
}