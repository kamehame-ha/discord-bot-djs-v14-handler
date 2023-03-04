const { Event } = require('../../build/index')
const client = require('../../index')
const { EmbedBuilder, Collection } = require('discord.js')
const cfg = require('../../config.json');
const ms = require('ms');
const cooldowns = new Collection();

module.exports = new Event({
    name: 'interactionCreate',
    run: async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName)
            if(!command) return interaction.reply({ content: 'This command is outdated', ephermal: true })

            if(command.permissions) {
                const user = interaction.guild.members.cache.get(interaction.user.id)
                if(!command.permissions.some(x => user.permissions.has(x))) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Error!' })
                            .setDescription(`You need this permissions to use this command:\n${command.permissions.map(x => `\`${x}\``).join(' ')}`)
                            .setColor('Red')
                    ],
                    ephemeral: true
                })
            }

            if(command.roles) {
                const user = interaction.guild.members.cache.get(interaction.user.id)
                if(!command.roles.some(x => user.roles.cache.get(x)) && !user.permissions.has('Administrator')) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Error!' })
                            .setDescription(`You need this roles to use this command:\n${command.roles.map(x => `<@&${x}>`).join(' ')}`)
                            .setColor('Red')
                    ],
                    ephemeral: true
                })
            }

            if(command.developerOnly) {
                if(interaction.user.id !== cfg.developerId) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Error!' })
                            .setDescription(`This command is developer only`)
                            .setColor('Red')
                    ],
                    ephemeral: true
                })
            }

            if(command.developerGuildOnly) {
                if(interaction.guild.id !== cfg.developerGuildId) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Error!' })
                            .setDescription(`This command is developer guild only`)
                            .setColor('Red')
                    ],
                    ephemeral: true
                })
            }

            if(command.cooldown) {
                if(cooldowns.has(`${command.name}-${interaction.user.id}-${interaction.guild.id}`)) {
                    const duration = ms(cooldowns.get(`${command.name}-${interaction.user.id}-${interaction.guild.id}`) - Date.now(), { long: true })
                    return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: 'Error!' })
                            .setDescription(`Please wait \`${duration}\` to use this command again`)
                            .setColor('Red')
                    ],
                    ephemeral: true
                    })
                }
            }

            await command.run({ client: client, interaction: interaction })

            if(command.cooldown) {
                cooldowns.set(`${command.name}-${interaction.user.id}-${interaction.guild.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldowns.delete(`${command.name}-${interaction.user.id}-${interaction.guild.id}`)
                }, command.cooldown)
            }
        } else if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return

            await command.autocomplete({ interaction: interaction });
        }
    }
})