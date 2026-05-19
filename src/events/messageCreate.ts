import axios from "axios";
import Event from "../app/event";
import { VM } from "vm2";

export default new Event("on", "messageCreate", async (app, message) => {
    if(message.author.bot) return;
    if(!message.guild) return;

    const res = await axios.get(`${process.env.WEBSITE}/api/guilds/${message.guildID}/message-script`, {
        withCredentials: true
    }).then((r) => r.data).catch(() => undefined);

    if (!res || !res.script || !res.script.trim()) return;

    try {
        const vm = new VM({
            timeout: 5000,
            sandbox: {
                message: {
                    id: message.id,
                    content: message.content,
                    channel: {
                        id: message.channelID,
                        send: async (content: any) => {
                            return await send(message.channelID, content);
                        },
                    },
                    author: {
                        id: message.author.id,
                        color: message.author.accentColor,
                        name: message.author.globalName,
                        username: message.author.username,
                        avatarURL: message.author.avatarURL(),
                        bannerURL: message.author.bannerURL(),
                        createdAt: message.author.createdAt.getDate(),
                    },
                },
            },
            eval: false,
            wasm: false,
            allowAsync: true,
        });

        vm.run(res.script);

        async function send(id: string, content: any){
            const channel = await app.getChannel(id);

            if(channel && channel.type === 0){
                await channel.createMessage(content)
                    .then(async (message) => {
                        return {
                            id: message.id,
                            flags: message.flags,
                            content: message.content,
                            components: message.components,
                            embeds: message.embeds,
                            delete: async () => {
                                await message.delete();
                            },
                        };
                    })
                    .catch(console.log);
            }
        }
    } catch(e){
        console.log(e);
    }
});