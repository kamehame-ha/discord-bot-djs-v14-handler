const { Client } = require('discord.js')
const { 
    loadCommands, 
    createCommands, 
    updateCommands, 
    deleteCommands 
} = require('./functions/commands')
const { loadEvents } = require('./functions/events')
const command_data = require('../command_data.json').data
const chalk = require('chalk')

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const command_array = []
    const event_array = []
    const file_data = []

    await loadEvents(client, event_array)

    client.on('ready', async () => {
        console.log(`${chalk.bold.white('Welcome to Discord.JS v14 Handler')} ${chalk.bold.red('by kameHame HA')}`)
        console.log(`Your bot logged as ${chalk.bold.blue(client.user.tag)} on ${chalk.bold.green(client.guilds.cache.size)} guilds`)
        console.log(`\n\n${chalk.bold.white('Handler log:')}`)

        const application_commands_fetch = await client.application.commands.fetch()

        await loadCommands(client, command_array, file_data)
        
        console.log(`Loaded ${chalk.bold.yellow(command_array.length)} command${command_array.length === 1 ? '' : 's'}`)
        console.log(`Loaded ${chalk.bold.cyan(event_array.length)} event${event_array.length === 1 ? '' : 's'}...\n`)

        await updateCommands(client, file_data, application_commands_fetch, command_data)
        await createCommands(client, command_array, file_data, application_commands_fetch)
        await deleteCommands(client, application_commands_fetch)
    })
}