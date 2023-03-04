const { Client } = require('discord.js')
const fs = require('fs')
/**
 * 
 * @param {Client} client 
 * @param {Array<any>} event_array
 */
async function loadEvents(client, event_array) {
    fs.readdirSync(`${process.cwd()}/events`).forEach(async dir => {
        const files = fs.readdirSync(`${process.cwd()}/events/${dir}`).filter(file => file.endsWith('.js'))

        for (const file of files) {
            const event = require(`${process.cwd()}/events/${dir}/${file}`)

            if(event.name) {
                if(event.rest) {
                    if(event.once) client.rest.once(event.name, (...args) => event.run(...args))
                    else client.rest.on(event.name, (...args) => event.run(...args))
                } else {
                    if(event.once) client.once(event.name, (...args) => event.run(...args))
                    else client.on(event.name, (...args) => event.run(...args))
                }
                event_array.push(event)
            }
        }
    })
}

module.exports = { loadEvents }