const { EmbedBuilder } = require('discord.js')
const { CommandBuilder } = require('../../build/index')

module.exports = new CommandBuilder({
    name: 'ping',
    description: 'Sends out bot ping',
    cooldown: 5000,
    run: ({ interaction, client }) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Ping: ${client.ws.ping}ms` })

        interaction.reply({ embeds: [embed] })
    }
})