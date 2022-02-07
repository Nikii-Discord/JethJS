const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class vipset extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['setvip', 'darvip', 'setarvip']
        this.category = 'VIP'
    }

    async run(message, args) {
        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const embedVIP = new MessageEmbed()
        .setTimestamp()
        .setColor(colors.mod)
        .setTitle('**Err:**', `${usuario}`, true)
        .setDescription('Missing Action') // inline false
        .addField('*Verifique se você possui um cargo criado ou status de membro:*', '`VIP`', true)
        .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

        const role = await this.client.database.Cargo.findOne({ _id: message.author.id })
        if(!role) return message.channel.send(embedVIP)

        const embedA = new MessageEmbed()
            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${usuario}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embedA)
        if (!usuario) return message.reply("Você não mencionou o usuário!");
        if (usuario.id === message.guild.ownerID) {
            message.reply("Você não tem permissão para setar role neste usuário");
            return 0;
        }
        if (usuario.id === this.client.user.id) {
            message.reply("Não posso me setar vip.");
            return 0;
        }
        let executorRole = message.member.roles.highest;
        let targetRole = usuario.roles.highest;
        if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
            message.reply("Você não tem permissão para setar vip neste usuário");
            return 0;
        }
        let clientRole = message.guild.me.roles.highest;
        if (clientRole.comparePositionTo(targetRole) <= 0) {
            message.reply("Você não tem permissão para setar vip neste usuário");
            return 0;
        }

        const roled = message.guild.roles.cache.get(role.roleID)

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor("#ffbc00")
            .setDescription(`${usuario} **RECEBEU O VIP DE** ${message.author}`)
            .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addField('**Cargo Adicionado:**', `${roled}`, true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))


        if (usuario.roles.cache.has(role.roleID)) return message.reply("o membro mencionado já possui esse vip.")
        usuario.roles.add(message.guild.roles.cache.get(role.roleID))
        message.channel.send(embed)

    }
}