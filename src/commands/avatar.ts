import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MessageFlags, MediaGalleryItem, MessageActionRowComponent } from "oceanic.js";

export default new Command()
    .setRun(async function({ app, guild, author, interaction }){
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const member = guild ? await guild.getMember(option.id).catch(() => undefined) : undefined;
        const url = user.avatarURL();
        const url2 = member?.avatarURL();

        const items: MediaGalleryItem[] = [{
            media: {
                url,
            },
            description: "Avatar Global",
        }];
        const components: MessageActionRowComponent[] = [{
            url,
            type: 2,
            style: 5,
            label: "Avatar Global",
            emoji: await app.getButoji("download"),
        }];

        if(url2){
            items.push({
                media: {
                    url: url2,
                },
                description: "Avatar Local",
            });
            components.push({
                url: url2,
                type: 2,
                style: 5,
                label: "Avatar Local",
                emoji: await app.getButoji("download"),
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${member?.nick ?? user.globalName ?? user.username}**`,
                }, {
                    items,
                    type: 12,
                }],
            }, {
                type: 1,
                components,
            }],
        });
    })

    .setCommand({
        name: "avatar",
        description: "See a user avatar.",
        descriptionLocalizations: {
            "pt-BR": "Veja o avatar do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
        integrationTypes: [
            ApplicationIntegrationTypes.GUILD_INSTALL,
            ApplicationIntegrationTypes.USER_INSTALL,
        ],
        contexts: [
            InteractionContextTypes.BOT_DM,
            InteractionContextTypes.GUILD,
            InteractionContextTypes.PRIVATE_CHANNEL,
        ],
        type: ApplicationCommandTypes.CHAT_INPUT,
    })