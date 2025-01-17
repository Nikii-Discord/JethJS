const { TranslateFunctions } = require('../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = async function onGuildMemberAdd(member) {
  // if(!this.client.user.me.permissions.has(andfabhsdfhabsdfjh))return vvtnc asdfjabdnsldbf
  const guildDocument = await this.database.guild.getOrCreate(member.guild.id)
  setTimeout(async () => {
    if (guildDocument) {
      if (guildDocument.count) {
        const channel = member.guild.channels.cache.get(guildDocument.countChannel)
        if (!channel) return
        await channel.setTopic(guildDocument.countMessage.replace('{azul}', TranslateFunctions.azul(member.guild.memberCount))
          .replace('{pinky}', TranslateFunctions.pinky(member.guild.memberCount))
          .replace('{gold}', TranslateFunctions.gold(member.guild.memberCount))
          .replace('{green}', TranslateFunctions.green(member.guild.memberCount))
          .replace('{rosa}', TranslateFunctions.rosa(member.guild.memberCount))
          .replace('{exa}', TranslateFunctions.exa(member.guild.memberCount))
          .replace('{ruby}', TranslateFunctions.ruby(member.guild.memberCount))
          .replace('{amarelo}', TranslateFunctions.amarelo(member.guild.memberCount))
          .replace('{violeta}', TranslateFunctions.violeta(member.guild.memberCount))
          .replace('{bouncepink}', TranslateFunctions.bouncepink(member.guild.memberCount))
          .replace('{redblack}', TranslateFunctions.redblack(member.guild.memberCount))
          .replace('{aqua}', TranslateFunctions.aqua(member.guild.memberCount))
          .replace('{ice}', TranslateFunctions.ice(member.guild.memberCount))
          .replace('{roxo}', TranslateFunctions.roxo(member.guild.memberCount))
          .replace('{rainbow}', TranslateFunctions.rainbow(member.guild.memberCount))
          .replace('{blk}', TranslateFunctions.blk(member.guild.memberCount))
          .replace('{natal}', TranslateFunctions.natal(member.guild.memberCount))
          .replace('{bouncepurple}', TranslateFunctions.bouncepurple(member.guild.memberCount))
          .replace('{exa-new}', TranslateFunctions.exanew(member.guild.memberCount))
          .replace('{redblue}', TranslateFunctions.redblue(member.guild.memberCount)))
      }
    }
    setTimeout(async () => {
      if (guildDocument.welcomeModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelWelcome)
        if (!channel) return
        let message = guildDocument.welcomeMessage
        if (!message.length) return 0;
        message = (typeof message === 'string' ? message : JSON.stringify(message))
          .replace(/\{USER\}/g, member)
          .replace(/\{SERVER\}/g, member.guild.name)
          .replace(/\{AVATAR\}/g, member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .replace(/\{USER-ID\}/g, member.id)
          .replace(/\{CONTA-CRIADA\}/g, moment(member.user.createdTimestamp).format('LL'))
          .replace(/\{USER-NAME\}/g, member.user.username)
        try {
          const messageEmbed = JSON.parse(message)
          channel.send({
            content: messageEmbed['content'] ? messageEmbed.content : (typeof messageEmbed === 'string') ? messageEmbed : '',
            embeds: [messageEmbed['embed'] ? messageEmbed.embed : (typeof messageEmbed === 'object') ? messageEmbed : {}]
          })
        } catch (err) {
          channel.send(message)
        }

        if (guildDocument.novato.length) {
          member.roles.add(guildDocument.novato, 'Auto-Role | Ativado').catch(() => { })
        }
      } else {
        return;
      }
    });
    return 0;
  })
}
