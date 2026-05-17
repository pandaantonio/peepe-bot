import { AnyTextableChannel, Message, Uncached } from "oceanic.js";

interface Context {
    args: string[];
    message: Message<AnyTextableChannel | Uncached>;
}

export default function generateSandbox({ args, message }: Context) {
    return {
        args,
        message: {
            id: message.id,
            author: {
                id: message.author.id,
            },
            channel: {
                id: message.channelID,
                guild: {
                    id: message.guildID,
                },
                send: async (content: any) => {
                    await message.channel?.createMessage(content);
                },
            }
        }
    };
}