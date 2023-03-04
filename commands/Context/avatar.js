const { ApplicationCommandType, EmbedBuilder } = require('discord.js')
const { ContextMenuBuilder } = require('../../build/index')

module.exports = new ContextMenuBuilder({
    name: 'User Avatar',
    type: ApplicationCommandType.User,
    run: ({ interaction, client }) => {
        const member = interaction.guild.members.cache.get(interaction.targetId)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Avatar of: ${member.user.username}`, iconURL: `${member.user.displayAvatarURL()}` })
            .setColor('#2f3136')
            .setImage(member.user.displayAvatarURL())

        interaction.reply({ embeds: [embed] })
    }
})