const { Client, IntentsBitField, Collection } = require('discord.js')
const { token } = require('./config.json')
const handler = require('./handler/handler')

const client = new Client({
    intents: Object.entries(IntentsBitField.Flags)
})
module.exports = client

client.commands = new Collection();

handler(client)

client.login(token)

