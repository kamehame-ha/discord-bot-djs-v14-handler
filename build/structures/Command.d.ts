import { Client, PermissionResolvable, ChatInputApplicationCommandData, AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';
export type CommandOptions = {
    name: string;
    permissions?: Array<PermissionResolvable>;
    developerOnly?: boolean;
    developerGuildOnly?: boolean;
    cooldown?: number;
    roles?: Array<string>;
    run: CommandRunFunction;
    autocomplete: AutoCompleteRunFunc;
} & ChatInputApplicationCommandData;
interface CommandRunParams {
    client: Client;
    interaction: ChatInputCommandInteraction;
}
interface AutoCompleteRunOptions {
    interaction: AutocompleteInteraction;
}
export type CommandRunFunction = (options: CommandRunParams) => any;
export type AutoCompleteRunFunc = (options: AutoCompleteRunOptions) => any;
export declare class CommandBuilder {
    options: CommandOptions;
    constructor(options: CommandOptions);
}
export {};
