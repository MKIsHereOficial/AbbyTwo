import {Message, Client} from 'discord.js';

type NormalCommand = (client: Client, message: Message, args: string[]) => Promise<any>;

export default NormalCommand;