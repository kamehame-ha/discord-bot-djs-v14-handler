import { Client, PermissionResolvable, ContextMenuCommandInteraction, ChatInputApplicationCommandData } from 'discord.js';
export type ContextMenuOptions = {
    name: string;
    permissions?: Array<PermissionResolvable>;
    developerOnly?: boolean;
    developerGuildOnly?: boolean;
    cooldown?: number;
    roles?: Array<string>;
    run: ContextMenuRunFunction;
} & ChatInputApplicationCommandData;
interface ContextMenuRunParams {
    client: Client;
    interaction: ContextMenuCommandInteraction;
}
export type ContextMenuRunFunction = (options: ContextMenuRunParams) => any;
export declare class ContextMenuBuilder {
    options: ContextMenuOptions;
    constructor(options: ContextMenuOptions);
}
export {};
