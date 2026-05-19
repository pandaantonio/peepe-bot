import Event from "../app/event";
import axios from "axios";
import { VM } from "vm2";

export default new Event("on", "guildMemberAdd", async (app, member) => {
    const user = await app.rest.users.get(member.id);
    const guild = app.guilds.get(member.guildID);
    const res = await axios.get(`${process.env.WEBSITE}/api/guilds/${member.guild.id}/welcome-script`, {
        withCredentials: true
    }).then((r) => r.data).catch(() => undefined);

    if (!res || !res.script || !res.script.trim()) return;

    try {
        const vm = new VM({
            timeout: 5000,
            sandbox: {
                send,
                member: {
                    id: user.id,
                    name: user.globalName,
                    color: user.accentColor,
                    username: user.username,
                    avatarURL: user.avatarURL(),
                    bannerURL: user.bannerURL(),
                    createdAt: user.createdAt.getDate(),
                },
                guild: {
                    id: guild?.id,
                    name: guild?.name,
                    iconURL: guild?.iconURL(),
                    bannerURL: guild?.bannerURL(),
                    splashURL: guild?.splashURL(),
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