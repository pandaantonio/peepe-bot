"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateSandbox;
function generateSandbox({ args, message }) {
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
                send: async (content) => {
                    await message.channel?.createMessage(content);
                },
            }
        }
    };
}
