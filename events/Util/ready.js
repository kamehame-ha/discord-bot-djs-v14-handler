const { Event } = require('../../build/index')
const { ActivityType } = require('discord.js')

module.exports = new Event({
    name: 'ready',
    run: (client) => {
        client.user.setActivity(client.guilds.cache.size + ' guilds', { type: ActivityType.Watching })
    }
})