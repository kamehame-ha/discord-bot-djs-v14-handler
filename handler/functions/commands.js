const { Client, Collection, ApplicationCommand } = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')
const command_data = require('../../command_data.json').data
const crypto = require('crypto')
/**
 * 
 * @param {Client} client 
 * @param {Array<any>} command_array
 * @param {Array<{name, data}>} file_data
 */
async function loadCommands(client, command_array, file_data) {
    fs.readdirSync(`${process.cwd()}/commands`).forEach(async dir => {
        const files = fs.readdirSync(`${process.cwd()}/commands/${dir}`).filter(file => file.endsWith('.js'))

        for (const file of files) {
            const command = require(`${process.cwd()}/commands/${dir}/${file}`)

            if(command.name) {
                client.commands.set(command.name, command)
                command_array.push(command)
                const data = fs.readFileSync(`${process.cwd()}/commands/${dir}/${file}`, { encoding: 'utf-8' })
                file_data.push({ name: command.name, data: crypto.createHash('sha256').update(data).digest('hex') })
            }
        }
    })
}
/**
 * 
 * @param {Client} client 
 * @param {Array<any>} command_array
 * @param {Array<{name, data}>} file_data
 * @param {Collection<string, ApplicationCommand<{guild: GuildResolvable}>>} application_commands_fetch
 */
async function createCommands(client, command_array, file_data, application_commands_fetch) {
    async function loadActionList() {
        const creationList = []

        for (const [name, command] of client.commands) {
            const data = application_commands_fetch.find(x => x.name === command.name)
            if(!data) {
                const file = command_array.find(x => x.name === command.name)
                const f_data = file_data.find(x => x.name === command.name).data
                creationList.push({
                    name: command.name,
                    file: file,
                    f_data: f_data
                })
            }
        }

        return creationList
    }

    const actionList = await loadActionList()
    let json_data = fs.readFileSync(`${process.cwd()}/command_data.json`, { encoding: 'utf-8' })

    if (json_data && actionList.length !== 0) {
        let parsed = JSON.parse(json_data)
        let new_parsed = parsed['data'].filter(x => x.name !== actionList.find(y => y.name === x.name))
        actionList.forEach(async element => {
            new_parsed.push({
                name: element.name,
                content: crypto.createHash('sha256').update(element.f_data).digest('hex')
            })
            parsed['data'] = new_parsed
            await client.application.commands.create(element.file)
            console.log(`Created: ${chalk.bold.green(element.name)}`)
        })

        fs.writeFileSync(`${process.cwd()}/command_data.json`, JSON.stringify(parsed, null, 4), { encoding: 'utf-8' })
        json_data = null
    }
}
/**
 * 
 * @param {Client} client 
 * @param {Array<{name, data}>} file_data
 * @param {Collection<string, ApplicationCommand<{guild: GuildResolvable}>>} application_commands_fetch
 */
async function updateCommands(client, file_data, application_commands_fetch) {
    async function loadActionList(client) {
        const updateList = []

        for (const [name, command] of application_commands_fetch) {
            const data = client.commands.find(x => x.name === command.name)
            if(data) {
                const target = command_data.find(x => x.name === command.name)
                const file_target = file_data.find(x => x.name === command.name)

                if(target.content !== file_target.data) {
                    updateList.push({
                        name: data.name,
                        data: data,
                        command: command,
                        f_data: file_target.data
                    })
                }
            }
        }

        return updateList
    }

    const actionList = await loadActionList(client)
    let json_data = fs.readFileSync(`${process.cwd()}/command_data.json`, { encoding: 'utf-8' })

    if (json_data && actionList.length !== 0) {
        let parsed = JSON.parse(json_data)
        actionList.forEach(async element => {
            let new_parsed = parsed['data'].filter(x => x.name !== element.name)
            new_parsed.push({
                name: element.name,
                content: element.f_data
            })
            parsed['data'] = new_parsed
            await client.application.commands.edit(element.command, element.data)
            console.log(`Updated: ${chalk.bold.cyan(element.name)}`)
        })

        fs.writeFileSync(`${process.cwd()}/command_data.json`, JSON.stringify(parsed, null, 4), { encoding: 'utf-8' })
    }
}
/**
 * 
 * @param {Client} client 
 * @param {Collection<string, ApplicationCommand<{guild: GuildResolvable}>>} application_commands_fetch
 */
async function deleteCommands(client, application_commands_fetch) {
    async function loadActionList(client) {
        const deleteList = []

        for (const [name, command] of application_commands_fetch) {
            const data = client.commands.find(x => x.name === command.name)
            if(!data) {
                deleteList.push({
                    name: command.name,
                    command: command,
                })
            }
        }

        return deleteList
    }

    const actionList = await loadActionList(client)
    let json_data = fs.readFileSync(`${process.cwd()}/command_data.json`, { encoding: 'utf-8' })

    if (json_data && actionList.length !== 0) {
        let parsed = JSON.parse(json_data)
        actionList.forEach(async element => {
            let new_parsed = parsed['data'].filter(x => x.name !== element.name)
            parsed['data'] = new_parsed
            await client.application.commands.delete(element.command)
            console.log(`Deleted: ${chalk.bold.red(element.name)}`)
        })

        fs.writeFileSync(`${process.cwd()}/command_data.json`, JSON.stringify(parsed, null, 4), { encoding: 'utf-8' })
    }
}

module.exports = { loadCommands, createCommands, updateCommands, deleteCommands }