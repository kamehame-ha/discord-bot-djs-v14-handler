import { ClientEvents } from 'discord.js'

export type EventOptions<Key extends keyof ClientEvents> = {
    name: Key
    alias?: string
    once?: boolean
    run: (...args: ClientEvents[Key]) => any
}

export class Event<Key extends keyof ClientEvents> {
    options: EventOptions<Key>
    constructor(options: EventOptions<Key>) {
        Object.assign(this, options)
    }
}